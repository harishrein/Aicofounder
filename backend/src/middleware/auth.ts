import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: any;
}

// JWT authentication middleware
export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    if (!token) {
      throw createError('Access token is required', 401);
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Find user
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      throw createError('User not found', 401);
    }

    // Attach user info to request
    req.userId = user.id;
    req.user = user;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      logger.warn('Invalid JWT token provided', { ip: req.ip, userAgent: req.get('user-agent') });
      next(createError('Invalid or expired token', 401));
    } else {
      next(error);
    }
  }
}

// Role-based authorization middleware
export function authorize(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(createError('User not authenticated', 401));
      return;
    }

    if (!roles.includes(req.user.role)) {
      logger.warn('Unauthorized access attempt', {
        userId: req.user.id,
        userRole: req.user.role,
        requiredRoles: roles,
        ip: req.ip,
        url: req.url
      });
      next(createError('Insufficient permissions', 403));
      return;
    }

    next();
  };
}

// Optional authentication - doesn't fail if no token provided
export async function optionalAuthenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.substring(7)
      : null;

    if (!token) {
      // No token provided, continue without user info
      next();
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Find user
    const user = await User.findByPk(decoded.userId);
    if (user) {
      // Attach user info to request if found
      req.userId = user.id;
      req.user = user;
    }

    next();
  } catch (error) {
    // Continue without user info if token is invalid
    logger.debug('Optional authentication failed, continuing without user', { error });
    next();
  }
}