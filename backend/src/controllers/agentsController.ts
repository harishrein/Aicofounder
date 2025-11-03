import { Request, Response } from 'express';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

// Mock agent data
const mockAgents = [
  {
    id: 'agent_alex',
    name: 'Alex',
    type: 'sales',
    status: 'idle',
    capabilities: ['lead_generation', 'outreach', 'proposal_creation', 'follow_ups'],
    specializations: ['B2B Sales', 'Lead Qualification', 'CRM Integration'],
    current_task: null,
    performance_metrics: {
      tasks_completed: 142,
      success_rate: 87.5,
      average_response_time: '2.3 minutes',
    },
    personality_settings: {
      tone: 'professional',
      formality: 'medium',
      proactiveness: 'high',
    },
    autonomy_level: 'semi_autonomous',
    last_active_at: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'agent_riley',
    name: 'Riley',
    type: 'marketing',
    status: 'working',
    capabilities: ['content_creation', 'social_media', 'seo', 'campaigns'],
    specializations: ['Content Marketing', 'Social Media Strategy', 'Email Campaigns'],
    current_task: 'Creating weekly blog post calendar',
    performance_metrics: {
      tasks_completed: 98,
      success_rate: 92.1,
      average_response_time: '1.8 minutes',
    },
    personality_settings: {
      tone: 'creative',
      formality: 'casual',
      proactiveness: 'medium',
    },
    autonomy_level: 'semi_autonomous',
    last_active_at: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 'agent_morgan',
    name: 'Morgan',
    type: 'finance',
    status: 'idle',
    capabilities: ['invoicing', 'expense_tracking', 'cash_flow', 'reporting'],
    specializations: ['Financial Planning', 'Cash Flow Management', 'Tax Preparation'],
    current_task: null,
    performance_metrics: {
      tasks_completed: 186,
      success_rate: 95.2,
      average_response_time: '1.5 minutes',
    },
    personality_settings: {
      tone: 'precise',
      formality: 'formal',
      proactiveness: 'medium',
    },
    autonomy_level: 'semi_autonomous',
    last_active_at: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: 'agent_jordan',
    name: 'Jordan',
    type: 'operations',
    status: 'idle',
    capabilities: ['client_onboarding', 'project_management', 'quality_control'],
    specializations: ['Process Optimization', 'Project Management', 'Quality Assurance'],
    current_task: null,
    performance_metrics: {
      tasks_completed: 124,
      success_rate: 89.7,
      average_response_time: '2.1 minutes',
    },
    personality_settings: {
      tone: 'organized',
      formality: 'formal',
      proactiveness: 'high',
    },
    autonomy_level: 'semi_autonomous',
    last_active_at: new Date(Date.now() - 1200000).toISOString(),
  },
  {
    id: 'agent_sam',
    name: 'Sam',
    type: 'hr',
    status: 'idle',
    capabilities: ['recruitment', 'onboarding', 'performance_tracking'],
    specializations: ['Talent Acquisition', 'Employee Relations', 'Training'],
    current_task: null,
    performance_metrics: {
      tasks_completed: 76,
      success_rate: 84.3,
      average_response_time: '3.2 minutes',
    },
    personality_settings: {
      tone: 'supportive',
      formality: 'medium',
      proactiveness: 'low',
    },
    autonomy_level: 'semi_autonomous',
    last_active_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: 'agent_taylor',
    name: 'Taylor',
    type: 'research',
    status: 'idle',
    capabilities: ['market_research', 'competitor_analysis', 'trend_monitoring'],
    specializations: ['Market Intelligence', 'Competitive Analysis', 'Innovation'],
    current_task: null,
    performance_metrics: {
      tasks_completed: 89,
      success_rate: 91.5,
      average_response_time: '4.1 minutes',
    },
    personality_settings: {
      tone: 'analytical',
      formality: 'formal',
      proactiveness: 'medium',
    },
    autonomy_level: 'semi_autonomous',
    last_active_at: new Date(Date.now() - 2400000).toISOString(),
  },
  {
    id: 'agent_casey',
    name: 'Casey',
    type: 'customer_success',
    status: 'idle',
    capabilities: ['client_communication', 'support_tickets', 'relationship_management'],
    specializations: ['Customer Support', 'Client Retention', 'Success Planning'],
    current_task: null,
    performance_metrics: {
      tasks_completed: 156,
      success_rate: 93.8,
      average_response_time: '1.7 minutes',
    },
    personality_settings: {
      tone: 'empathetic',
      formality: 'casual',
      proactiveness: 'high',
    },
    autonomy_level: 'semi_autonomous',
    last_active_at: new Date(Date.now() - 600000).toISOString(),
  },
];

// Get all agents
export async function getAgents(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;

    // Filter and return agents for the user
    res.json({
      success: true,
      data: mockAgents,
    });
  } catch (error) {
    throw error;
  }
}

// Get specific agent
export async function getAgent(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { agentId } = req.params;

    const agent = mockAgents.find(a => a.id === agentId);
    if (!agent) {
      throw createError('Agent not found', 404);
    }

    // Add additional detailed information
    const detailedAgent = {
      ...agent,
      activity_log: [
        {
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          action: 'Completed invoice generation',
          status: 'success',
          duration: '3 minutes',
        },
        {
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          action: 'Sent payment reminder',
          status: 'success',
          duration: '2 minutes',
        },
        {
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          action: 'Updated cash flow projections',
          status: 'success',
          duration: '5 minutes',
        },
      ],
      configuration: {
        working_hours: {
          start: '09:00',
          end: '18:00',
          timezone: 'UTC',
        },
        notifications: {
          email: true,
          slack: false,
          desktop: true,
        },
        integrations: {
          stripe: 'connected',
          quickbooks: 'connected',
          gmail: 'connected',
        },
      },
    };

    res.json({
      success: true,
      data: detailedAgent,
    });
  } catch (error) {
    throw error;
  }
}

// Update agent settings
export async function updateAgentSettings(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { agentId } = req.params;
    const settings = req.body;

    const agent = mockAgents.find(a => a.id === agentId);
    if (!agent) {
      throw createError('Agent not found', 404);
    }

    // In a real implementation, update agent settings in database
    logger.info('Agent settings updated', { userId, agentId, settings });

    res.json({
      success: true,
      message: 'Agent settings updated successfully',
      data: {
        ...agent,
        personality_settings: { ...agent.personality_settings, ...settings.personality_settings },
        autonomy_level: settings.autonomy_level || agent.autonomy_level,
        configuration: { ...settings.configuration },
      },
    });
  } catch (error) {
    throw error;
  }
}

// Execute agent task manually
export async function executeAgentTask(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { agentId } = req.params;
    const { task, parameters } = req.body;

    const agent = mockAgents.find(a => a.id === agentId);
    if (!agent) {
      throw createError('Agent not found', 404);
    }

    // Mock task execution
    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    logger.info('Manual task execution started', {
      userId,
      agentId,
      agentName: agent.name,
      task,
      taskId,
    });

    res.json({
      success: true,
      data: {
        task_id: taskId,
        agent_name: agent.name,
        task,
        status: 'started',
        started_at: new Date().toISOString(),
        estimated_completion: new Date(Date.now() + 300000).toISOString(), // 5 minutes from now
      },
    });
  } catch (error) {
    throw error;
  }
}

// Get agent activity log
export async function getAgentActivity(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { agentId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    const agent = mockAgents.find(a => a.id === agentId);
    if (!agent) {
      throw createError('Agent not found', 404);
    }

    // Mock activity log
    const activityLog = [
      {
        id: 'activity_1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        action: 'Generated monthly financial report',
        status: 'completed',
        duration: '4 minutes 23 seconds',
        result: 'Report sent to founder via email',
        metadata: {
          report_type: 'monthly',
          period: '2024-01',
          format: 'PDF',
        },
      },
      {
        id: 'activity_2',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        action: 'Processed invoice payment',
        status: 'completed',
        duration: '1 minute 12 seconds',
        result: 'Payment of $2,500 received from ABC Corp',
        metadata: {
          client: 'ABC Corp',
          amount: 2500,
          payment_method: 'bank_transfer',
        },
      },
      {
        id: 'activity_3',
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        action: 'Sent payment reminders',
        status: 'completed',
        duration: '3 minutes 45 seconds',
        result: '3 reminders sent to overdue clients',
        metadata: {
          reminder_count: 3,
          total_overdue: 7500,
          template_used: 'friendly_reminder',
        },
      },
    ];

    res.json({
      success: true,
      data: {
        agent: {
          id: agent.id,
          name: agent.name,
          type: agent.type,
        },
        activities: activityLog,
        total: activityLog.length,
        has_more: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Train agent with feedback
export async function trainAgent(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { agentId } = req.params;
    const { feedback, rating, improvement_areas } = req.body;

    const agent = mockAgents.find(a => a.id === agentId);
    if (!agent) {
      throw createError('Agent not found', 404);
    }

    // In a real implementation, this would update the agent's learning model
    logger.info('Agent training feedback received', {
      userId,
      agentId,
      agentName: agent.name,
      feedback,
      rating,
      improvement_areas,
    });

    res.json({
      success: true,
      message: 'Agent training feedback recorded',
      data: {
        agent_id: agentId,
        feedback_id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        rating,
        improvement_areas_applied: improvement_areas || [],
        next_learning_cycle: new Date(Date.now() + 86400000).toISOString(), // 24 hours from now
      },
    });
  } catch (error) {
    throw error;
  }
}