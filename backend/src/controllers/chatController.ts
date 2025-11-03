import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { authenticate } from '@/middleware/auth';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

interface MessageRequest {
  content: string;
  message_type?: string;
  metadata?: Record<string, any>;
}

interface MessageResponse {
  success: boolean;
  data: {
    id: string;
    content: string;
    message_type: string;
    agent_name?: string;
    agent_type?: string;
    metadata?: Record<string, any>;
    timestamp: string;
  };
}

// Send message to AI Co-Founder
export async function sendMessage(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { content, message_type = 'text', metadata = {} }: MessageRequest = req.body;

    if (!content || content.trim().length === 0) {
      throw createError('Message content is required', 400);
    }

    // For now, return a simple mock response
    // In a full implementation, this would:
    // 1. Use intent recognition to understand the request
    // 2. Route to appropriate AI agent
    // 3. Generate response using AI service
    // 4. Store message in database

    const messageId = uuidv4();
    const agentResponse = generateMockResponse(content);

    logger.info('Message processed', {
      userId,
      messageId,
      contentLength: content.length,
      agentType: agentResponse.agent_type
    });

    res.json({
      success: true,
      data: {
        id: messageId,
        content: agentResponse.content,
        message_type: agentResponse.message_type,
        agent_name: agentResponse.agent_name,
        agent_type: agentResponse.agent_type,
        metadata: agentResponse.metadata,
        timestamp: new Date().toISOString(),
      },
    } as MessageResponse);
  } catch (error) {
    throw error;
  }
}

// Get message history
export async function getMessageHistory(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { limit = 50, offset = 0 } = req.query;

    // Mock message history for now
    const mockMessages = [
      {
        id: uuidv4(),
        content: 'Hello! I\'m your AI Co-Founder. How can I help you grow your business today?',
        message_type: 'text',
        sender_type: 'ai',
        agent_name: 'Orchestrator',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: uuidv4(),
        content: 'Send payment link of $299 to Sam',
        message_type: 'text',
        sender_type: 'user',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: uuidv4(),
        content: 'Done! I\'ve sent Sam a payment link for $299 via email. I\'ve logged this as pending revenue in our cash flow tracker. Based on Sam\'s history, payments usually arrive within 2-3 days. Want me to set a reminder to follow up if we don\'t receive payment by Thursday?',
        message_type: 'text',
        sender_type: 'ai',
        agent_name: 'Morgan',
        agent_type: 'finance',
        timestamp: new Date(Date.now() - 1700000).toISOString(),
      },
    ];

    res.json({
      success: true,
      data: {
        messages: mockMessages,
        total: mockMessages.length,
        has_more: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Get typing indicators
export async function getTypingIndicators(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;

    // Mock typing indicators for now
    const typingIndicators = [
      {
        agent_name: 'Morgan',
        agent_type: 'finance',
        is_typing: false,
      },
      {
        agent_name: 'Alex',
        agent_type: 'sales',
        is_typing: false,
      },
      {
        agent_name: 'Riley',
        agent_type: 'marketing',
        is_typing: false,
      },
    ];

    res.json({
      success: true,
      data: typingIndicators,
    });
  } catch (error) {
    throw error;
  }
}

// Generate mock response based on message content
function generateMockResponse(content: string): {
  content: string;
  message_type: string;
  agent_name?: string;
  agent_type?: string;
  metadata?: Record<string, any>;
} {
  const lowerContent = content.toLowerCase();

  // Simple pattern matching for demo purposes
  if (lowerContent.includes('payment') || lowerContent.includes('invoice') || lowerContent.includes('bill')) {
    return {
      content: `I'll help you with that payment request. Let me process this and create the necessary documentation. This will be handled by Morgan, our Finance Agent.`,
      message_type: 'text',
      agent_name: 'Morgan',
      agent_type: 'finance',
      metadata: {
        confidence: 0.85,
        intent: 'send_payment',
        entities: {
          action: 'send',
          object: 'payment'
        }
      }
    };
  }

  if (lowerContent.includes('lead') || lowerContent.includes('prospect') || lowerContent.includes('sales')) {
    return {
      content: `I'll help you find new leads! Alex, our Sales Agent, specializes in lead generation and outreach. Let me search for potential leads that match your criteria.`,
      message_type: 'text',
      agent_name: 'Alex',
      agent_type: 'sales',
      metadata: {
        confidence: 0.90,
        intent: 'generate_leads',
        entities: {
          action: 'find',
          object: 'leads'
        }
      }
    };
  }

  if (lowerContent.includes('client') || lowerContent.includes('onboard')) {
    return {
      content: `Welcome! I'll help you onboard this new client. Jordan, our Operations Agent, will handle the onboarding process while Morgan sets up the billing and Casey prepares the customer success workflow.`,
      message_type: 'text',
      agent_name: 'Jordan',
      agent_type: 'operations',
      metadata: {
        confidence: 0.88,
        intent: 'onboard_client',
        entities: {
          action: 'onboard',
          object: 'client'
        }
      }
    };
  }

  if (lowerContent.includes('email') || lowerContent.includes('message') || lowerContent.includes('summary')) {
    return {
      content: `I'll help you with your emails. Casey, our Customer Success Agent, can summarize your important emails and highlight action items that need your attention.`,
      message_type: 'text',
      agent_name: 'Casey',
      agent_type: 'customer_success',
      metadata: {
        confidence: 0.82,
        intent: 'summarize_emails',
        entities: {
          action: 'summarize',
          object: 'emails'
        }
      }
    };
  }

  if (lowerContent.includes('research') || lowerContent.includes('competitor') || lowerContent.includes('market')) {
    return {
      content: `I'll help you with that research. Taylor, our Research & Development Agent, specializes in market research and competitor analysis. Let me gather the relevant information for you.`,
      message_type: 'text',
      agent_name: 'Taylor',
      agent_type: 'research',
      metadata: {
        confidence: 0.87,
        intent: 'research_competitor',
        entities: {
          action: 'research',
          object: 'market'
        }
      }
    };
  }

  // Default response
  return {
    content: `I understand you need help with "${content}". Let me analyze this request and connect you with the right AI agent to handle your needs. Our team of specialized agents is ready to assist you!`,
    message_type: 'text',
    agent_name: 'Orchestrator',
    agent_type: 'orchestrator',
    metadata: {
      confidence: 0.75,
      intent: 'general_query',
      entities: {
        action: 'help',
        object: 'general'
      }
    }
  };
}