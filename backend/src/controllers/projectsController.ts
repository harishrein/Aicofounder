import { Request, Response } from 'express';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

// Get all projects
export async function getProjects(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { status, client_id, priority, limit = 50, offset = 0 } = req.query;

    // Mock projects data
    const projects = [
      {
        id: 'proj_1',
        client_id: 'client_1',
        client_name: 'TechStart Inc',
        name: 'E-commerce Automation Suite',
        description: 'Complete automation of e-commerce workflows including inventory, orders, and customer service',
        status: 'in_progress',
        start_date: '2024-01-01',
        end_date: '2024-01-30',
        budget: 15000,
        completion_percentage: 75,
        priority: 'high',
        assigned_team: ['Jordan', 'Morgan', 'Casey'],
        deliverables: [
          { name: 'Inventory automation', completed: true },
          { name: 'Order processing', completed: true },
          { name: 'Customer service bot', completed: false },
        ],
        next_milestone: 'Customer service bot deployment',
        actual_hours: 112,
        estimated_hours: 150,
        notes: 'On track for completion',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-08T00:00:00Z',
      },
      {
        id: 'proj_2',
        client_id: 'client_2',
        client_name: 'Growth Corp',
        name: 'CRM Integration Platform',
        description: 'Integration of multiple CRM systems with automated data synchronization',
        status: 'at_risk',
        start_date: '2024-01-05',
        end_date: '2024-02-15',
        budget: 22000,
        completion_percentage: 45,
        priority: 'medium',
        assigned_team: ['Jordan', 'Alex'],
        deliverables: [
          { name: 'API development', completed: false },
          { name: 'Data mapping', completed: true },
          { name: 'Testing', completed: false },
        ],
        next_milestone: 'API integration review',
        actual_hours: 67,
        estimated_hours: 200,
        notes: 'Facing technical challenges with API compatibility',
        created_at: '2024-01-05T00:00:00Z',
        updated_at: '2024-01-08T00:00:00Z',
      },
    ];

    res.json({
      success: true,
      data: {
        projects,
        total: projects.length,
        has_more: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Create new project
export async function createProject(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const projectData = req.body;

    // Mock project creation
    const newProject = {
      id: `proj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      ...projectData,
      status: 'planning',
      completion_percentage: 0,
      priority: 'medium',
      deliverables: [],
      milestones: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    logger.info('Project created', { userId, projectId: newProject.id });

    res.status(201).json({
      success: true,
      data: newProject,
    });
  } catch (error) {
    throw error;
  }
}

// Get specific project
export async function getProject(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { projectId } = req.params;

    // Mock detailed project data
    const project = {
      id: projectId,
      client_id: 'client_1',
      client_name: 'TechStart Inc',
      name: 'E-commerce Automation Suite',
      description: 'Complete automation of e-commerce workflows including inventory, orders, and customer service',
      status: 'in_progress',
      start_date: '2024-01-01',
      end_date: '2024-01-30',
      budget: 15000,
      completion_percentage: 75,
      priority: 'high',
      assigned_team: ['Jordan', 'Morgan', 'Casey'],
      deliverables: [
        {
          id: 'del_1',
          name: 'Inventory automation',
          description: 'Automated inventory tracking and reorder triggers',
          completed: true,
          completed_date: '2024-01-05',
          assigned_to: 'Jordan',
        },
        {
          id: 'del_2',
          name: 'Order processing',
          description: 'Automated order processing and fulfillment',
          completed: true,
          completed_date: '2024-01-10',
          assigned_to: 'Jordan',
        },
        {
          id: 'del_3',
          name: 'Customer service bot',
          description: 'AI-powered customer service automation',
          completed: false,
          assigned_to: 'Casey',
          due_date: '2024-01-25',
        },
      ],
      milestones: [
        {
          name: 'Phase 1 completion',
          date: '2024-01-10',
          completed: true,
        },
        {
          name: 'Beta testing',
          date: '2024-01-20',
          completed: false,
        },
        {
          name: 'Final delivery',
          date: '2024-01-30',
          completed: false,
        },
      ],
      next_milestone: 'Customer service bot deployment',
      actual_hours: 112,
      estimated_hours: 150,
      notes: 'On track for completion',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-08T00:00:00Z',
    };

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    throw error;
  }
}

// Update project
export async function updateProject(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { projectId } = req.params;
    const updates = req.body;

    logger.info('Project updated', { userId, projectId, updates });

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: {
        id: projectId,
        ...updates,
        updated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    throw error;
  }
}

// Create project deliverables
export async function createProjectTasks(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { projectId } = req.params;
    const { deliverables } = req.body;

    // Mock deliverable creation
    const newDeliverables = deliverables.map((del: any, index: number) => ({
      id: `del_${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
      project_id: projectId,
      ...del,
      completed: false,
      created_at: new Date().toISOString(),
    }));

    logger.info('Project deliverables created', {
      userId,
      projectId,
      deliverable_count: newDeliverables.length,
    });

    res.status(201).json({
      success: true,
      data: newDeliverables,
    });
  } catch (error) {
    throw error;
  }
}

// Get project analytics
export async function getProjectAnalytics(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { period = '30d' } = req.query;

    // Mock analytics data
    const analytics = {
      summary: {
        total_projects: 12,
        active_projects: 6,
        completed_projects: 4,
        on_track: 3,
        at_risk: 2,
        delayed: 1,
      },
      performance: {
        on_time_completion_rate: 83.3,
        budget_adherence: 91.2,
        client_satisfaction: 4.6,
        average_duration: '45 days',
      },
      budget_metrics: {
        total_budget: 185000,
        total_spent: 142000,
        budget_remaining: 43000,
        average_project_value: 15417,
      },
      team_utilization: [
        { agent: 'Jordan', utilization: 85, projects: 4 },
        { agent: 'Morgan', utilization: 72, projects: 3 },
        { agent: 'Casey', utilization: 68, projects: 2 },
        { agent: 'Alex', utilization: 45, projects: 1 },
      ],
      trends: [
        { month: '2023-11', completed: 2, revenue: 28500 },
        { month: '2023-12', completed: 3, revenue: 42000 },
        { month: '2024-01', completed: 4, revenue: 58000 },
      ],
    };

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    throw error;
  }
}