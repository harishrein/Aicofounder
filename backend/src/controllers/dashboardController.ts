import { Request, Response } from 'express';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

// Get daily summary
export async function getDailySummary(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;

    // Mock daily summary data
    const summary = {
      today: {
        new_leads: 3,
        scheduled_meetings: 2,
        pending_invoices: 5,
        tasks_completed: 12,
        unread_emails: 8,
      },
      metrics: {
        revenue_today: 1250.00,
        active_projects: 6,
        team_utilization: 85,
        client_satisfaction: 4.7,
      },
      urgent_items: [
        {
          type: 'overdue_payment',
          client: 'ABC Corp',
          amount: 2500.00,
          days_overdue: 7,
        },
        {
          type: 'urgent_email',
          sender: 'support@client.com',
          subject: 'Urgent: Integration issue',
          priority: 'high',
        },
      ],
      upcoming_deadlines: [
        {
          project: 'E-commerce Automation',
          deadline: '2024-01-15',
          progress: 75,
        },
        {
          project: 'CRM Integration',
          deadline: '2024-01-20',
          progress: 45,
        },
      ],
    };

    res.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    throw error;
  }
}

// Get cash flow data
export async function getCashFlow(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { period = '30d' } = req.query;

    // Mock cash flow data
    const cashFlow = {
      current_month: {
        income: 15420.00,
        expenses: 8750.00,
        net: 6670.00,
      },
      previous_month: {
        income: 12800.00,
        expenses: 9200.00,
        net: 3600.00,
      },
      trend: '+85.3%',
      pending_payments: [
        {
          client: 'TechStart Inc',
          amount: 2500.00,
          due_date: '2024-01-10',
          status: 'pending',
        },
        {
          client: 'Growth Corp',
          amount: 1800.00,
          due_date: '2024-01-12',
          status: 'pending',
        },
        {
          client: 'Digital Solutions',
          amount: 3200.00,
          due_date: '2024-01-15',
          status: 'pending',
        },
      ],
      projection: {
        next_month_income: 18500.00,
        next_month_expenses: 9500.00,
        next_month_net: 9000.00,
      },
    };

    res.json({
      success: true,
      data: cashFlow,
    });
  } catch (error) {
    throw error;
  }
}

// Get leads pipeline
export async function getLeadsPipeline(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;

    // Mock leads pipeline data
    const pipeline = {
      total_leads: 24,
      stages: {
        new: {
          count: 8,
          total_value: 125000,
          leads: [
            {
              id: 'lead_1',
              company: 'InnovateTech',
              contact: 'John Smith',
              value: 25000,
              priority: 'high',
              last_contact: '2024-01-05',
            },
            {
              id: 'lead_2',
              company: 'DataFlow Systems',
              contact: 'Sarah Johnson',
              value: 18000,
              priority: 'medium',
              last_contact: '2024-01-03',
            },
          ],
        },
        contacted: {
          count: 6,
          total_value: 95000,
          leads: [
            {
              id: 'lead_3',
              company: 'CloudFirst',
              contact: 'Michael Chen',
              value: 22000,
              priority: 'high',
              next_action: 'Follow-up call',
            },
          ],
        },
        proposal_sent: {
          count: 5,
          total_value: 145000,
          leads: [
            {
              id: 'lead_4',
              company: 'Streamline Inc',
              contact: 'Emily Davis',
              value: 35000,
              proposal_date: '2024-01-02',
              follow_up_date: '2024-01-10',
            },
          ],
        },
        negotiating: {
          count: 3,
          total_value: 78000,
          leads: [
            {
              id: 'lead_5',
              company: 'Automation Pro',
              contact: 'Robert Wilson',
              value: 28000,
              status: 'Price negotiation',
            },
          ],
        },
        closed_won: {
          count: 2,
          total_value: 45000,
          leads: [
            {
              id: 'lead_6',
              company: 'Smart Solutions',
              contact: 'Lisa Anderson',
              value: 25000,
              close_date: '2024-01-01',
            },
          ],
        },
      },
      conversion_rate: 8.3,
      average_deal_size: 12500,
      sales_cycle_days: 42,
    };

    res.json({
      success: true,
      data: pipeline,
    });
  } catch (error) {
    throw error;
  }
}

// Get active projects
export async function getActiveProjects(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;

    // Mock projects data
    const projects = [
      {
        id: 'proj_1',
        client_name: 'TechStart Inc',
        name: 'E-commerce Automation Suite',
        status: 'on_track',
        completion_percentage: 75,
        start_date: '2024-01-01',
        deadline: '2024-01-30',
        budget: 15000,
        actual_spend: 11250,
        team: ['Jordan', 'Morgan', 'Casey'],
        next_milestone: 'Complete payment integration testing',
        overdue_tasks: 0,
      },
      {
        id: 'proj_2',
        client_name: 'Growth Corp',
        name: 'CRM Integration Platform',
        status: 'at_risk',
        completion_percentage: 45,
        start_date: '2024-01-05',
        deadline: '2024-02-15',
        budget: 22000,
        actual_spend: 14300,
        team: ['Jordan', 'Alex'],
        next_milestone: 'API integration review',
        overdue_tasks: 2,
      },
      {
        id: 'proj_3',
        client_name: 'Digital Solutions',
        name: 'Marketing Automation Setup',
        status: 'delayed',
        completion_percentage: 30,
        start_date: '2023-12-15',
        deadline: '2024-01-20',
        budget: 12000,
        actual_spend: 8900,
        team: ['Riley', 'Casey'],
        next_milestone: 'Client feedback session',
        overdue_tasks: 3,
      },
    ];

    const summary = {
      total_projects: projects.length,
      on_track: projects.filter(p => p.status === 'on_track').length,
      at_risk: projects.filter(p => p.status === 'at_risk').length,
      delayed: projects.filter(p => p.status === 'delayed').length,
      total_budget: projects.reduce((sum, p) => sum + p.budget, 0),
      total_spend: projects.reduce((sum, p) => sum + p.actual_spend, 0),
      average_completion: Math.round(projects.reduce((sum, p) => sum + p.completion_percentage, 0) / projects.length),
    };

    res.json({
      success: true,
      data: {
        summary,
        projects,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Get agent task queue
export async function getTaskQueue(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;

    // Mock task queue data
    const taskQueue = {
      pending_tasks: [
        {
          id: 'task_1',
          agent_name: 'Morgan',
          agent_type: 'finance',
          task: 'Prepare monthly financial report',
          priority: 'high',
          due_date: '2024-01-10',
          estimated_time: '2 hours',
        },
        {
          id: 'task_2',
          agent_name: 'Alex',
          agent_type: 'sales',
          task: 'Follow up with 5 high-priority leads',
          priority: 'medium',
          due_date: '2024-01-11',
          estimated_time: '1 hour',
        },
        {
          id: 'task_3',
          agent_name: 'Riley',
          agent_type: 'marketing',
          task: 'Create social media content calendar',
          priority: 'low',
          due_date: '2024-01-15',
          estimated_time: '3 hours',
        },
      ],
      in_progress_tasks: [
        {
          id: 'task_4',
          agent_name: 'Jordan',
          agent_type: 'operations',
          task: 'Client onboarding for NewCo Inc',
          started_at: '2024-01-08 09:00',
          progress: 60,
          estimated_completion: '2024-01-08 14:00',
        },
      ],
      recently_completed: [
        {
          id: 'task_5',
          agent_name: 'Casey',
          agent_type: 'customer_success',
          task: 'Client satisfaction survey analysis',
          completed_at: '2024-01-08 08:30',
          duration: '45 minutes',
        },
      ],
    };

    res.json({
      success: true,
      data: taskQueue,
    });
  } catch (error) {
    throw error;
  }
}