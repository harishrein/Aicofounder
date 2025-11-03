import { Server as SocketIOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import { logger } from '@/utils/logger';
import { User } from '@/models/User';

interface AuthenticatedSocket {
  userId: string;
  user: any;
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export function setupSocketIO(io: SocketIOServer): void {
  // Authentication middleware for socket connections
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error('Authentication token is required'));
      }

      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await User.findByPk(decoded.userId);

      if (!user) {
        return next(new Error('User not found'));
      }

      // Attach user info to socket
      (socket as any).userId = user.id;
      (socket as any).user = user;

      next();
    } catch (error) {
      logger.error('Socket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  // Handle socket connections
  io.on('connection', (socket) => {
    const userId = (socket as any).userId;
    logger.info('User connected to WebSocket', { userId, socketId: socket.id });

    // Join user-specific room
    socket.join(`user_${userId}`);

    // Handle typing indicators
    socket.on('typing_start', (data) => {
      const { agentName, messageType = 'text' } = data;
      socket.broadcast.emit('agent_typing', {
        agentName,
        isTyping: true,
        messageType,
        userId
      });
    });

    socket.on('typing_stop', (data) => {
      const { agentName } = data;
      socket.broadcast.emit('agent_typing', {
        agentName,
        isTyping: false,
        userId
      });
    });

    // Handle message status updates
    socket.on('message_status', (data) => {
      const { messageId, status, timestamp } = data;
      socket.broadcast.emit('message_status_update', {
        messageId,
        status,
        timestamp,
        userId
      });
    });

    // Handle agent status updates
    socket.on('agent_status', (data) => {
      const { agentName, status, currentTask } = data;
      socket.broadcast.emit('agent_status_update', {
        agentName,
        status,
        currentTask,
        timestamp: new Date().toISOString(),
        userId
      });
    });

    // Handle dashboard updates
    socket.on('dashboard_update', (data) => {
      const { widget, updateData } = data;
      socket.broadcast.emit('dashboard_refresh', {
        widget,
        data: updateData,
        timestamp: new Date().toISOString(),
        userId
      });
    });

    // Handle approval notifications
    socket.on('approval_request', (data) => {
      const { type, itemId, description, agentName } = data;
      socket.broadcast.emit('approval_notification', {
        type,
        itemId,
        description,
        agentName,
        timestamp: new Date().toISOString(),
        userId
      });
    });

    // Handle task progress updates
    socket.on('task_progress', (data) => {
      const { taskId, progress, status } = data;
      socket.broadcast.emit('task_progress_update', {
        taskId,
        progress,
        status,
        timestamp: new Date().toISOString(),
        userId
      });
    });

    // Handle real-time notifications
    socket.on('notification', (data) => {
      const { type, title, message, level = 'info' } = data;
      socket.broadcast.emit('new_notification', {
        id: `notification_${Date.now()}_${Math.random()}`,
        type,
        title,
        message,
        level,
        timestamp: new Date().toISOString(),
        userId,
        read: false
      });
    });

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      logger.info('User disconnected from WebSocket', { userId, socketId: socket.id, reason });
    });

    // Handle errors
    socket.on('error', (error) => {
      logger.error('Socket error:', error);
    });
  });

  // Broadcast functions for external use
  (io as any).broadcastToUser = (userId: string, event: string, data: any) => {
    io.to(`user_${userId}`).emit(event, data);
  };

  (io as any).broadcastToAll = (event: string, data: any) => {
    io.emit(event, data);
  };

  logger.info('Socket.IO server configured and listening');
}

// Helper function to emit agent typing status
export function emitAgentTyping(
  io: SocketIOServer,
  userId: string,
  agentName: string,
  isTyping: boolean
): void {
  (io as any).broadcastToUser(userId, 'agent_typing', {
    agentName,
    isTyping,
    timestamp: new Date().toISOString()
  });
}

// Helper function to emit agent status update
export function emitAgentStatus(
  io: SocketIOServer,
  userId: string,
  agentName: string,
  status: string,
  currentTask?: string
): void {
  (io as any).broadcastToUser(userId, 'agent_status_update', {
    agentName,
    status,
    currentTask,
    timestamp: new Date().toISOString()
  });
}

// Helper function to emit dashboard update
export function emitDashboardUpdate(
  io: SocketIOServer,
  userId: string,
  widget: string,
  data: any
): void {
  (io as any).broadcastToUser(userId, 'dashboard_refresh', {
    widget,
    data,
    timestamp: new Date().toISOString()
  });
}

// Helper function to emit notification
export function emitNotification(
  io: SocketIOServer,
  userId: string,
  type: string,
  title: string,
  message: string,
  level: string = 'info'
): void {
  (io as any).broadcastToUser(userId, 'new_notification', {
    id: `notification_${Date.now()}_${Math.random()}`,
    type,
    title,
    message,
    level,
    timestamp: new Date().toISOString(),
    read: false
  });
}