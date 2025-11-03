import { Request, Response } from 'express';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

// Get all leads
export async function getLeads(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { status, industry, priority_score, limit = 50, offset = 0 } = req.query;

    // Mock leads data
    const leads = [
      {
        id: 'lead_1',
        name: 'John Smith',
        email: 'john@innovatetech.com',
        company: 'InnovateTech',
        phone: '+1-555-0123',
        industry: 'technology',
        status: 'contacted',
        source: 'web_scrape',
        priority_score: 8,
        estimated_value: 25000,
        budget: 30000,
        authority_level: 'decision_maker',
        need_description: 'Looking for automation solutions for customer support',
        timeline: 'Q1 2024',
        last_contact_date: '2024-01-05',
        next_action_date: '2024-01-12',
        assigned_agent: 'Alex',
        notes: 'Very interested, requesting proposal',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-08T00:00:00Z',
      },
      {
        id: 'lead_2',
        name: 'Sarah Johnson',
        email: 'sarah@dataflow.com',
        company: 'DataFlow Systems',
        phone: '+1-555-0124',
        industry: 'software',
        status: 'new',
        source: 'linkedin',
        priority_score: 7,
        estimated_value: 18000,
        budget: 20000,
        authority_level: 'influencer',
        need_description: 'CRM integration automation',
        timeline: 'Q2 2024',
        last_contact_date: null,
        next_action_date: '2024-01-10',
        assigned_agent: null,
        notes: 'Warm lead from LinkedIn connection',
        created_at: '2024-01-07T00:00:00Z',
        updated_at: '2024-01-07T00:00:00Z',
      },
    ];

    res.json({
      success: true,
      data: {
        leads,
        total: leads.length,
        has_more: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Create new lead
export async function createLead(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const leadData = req.body;

    // Mock lead creation
    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      ...leadData,
      status: 'new',
      priority_score: leadData.priority_score || 5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    logger.info('Lead created', { userId, leadId: newLead.id });

    res.status(201).json({
      success: true,
      data: newLead,
    });
  } catch (error) {
    throw error;
  }
}

// Update lead
export async function updateLead(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { leadId } = req.params;
    const updates = req.body;

    logger.info('Lead updated', { userId, leadId, updates });

    res.json({
      success: true,
      message: 'Lead updated successfully',
      data: {
        id: leadId,
        ...updates,
        updated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    throw error;
  }
}

// Initiate lead generation workflow
export async function scrapeLeads(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { industry, criteria, count = 20 } = req.body;

    // Mock lead scraping workflow
    const workflowId = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    logger.info('Lead generation workflow started', {
      userId,
      workflowId,
      industry,
      criteria,
      requested_count: count,
    });

    res.json({
      success: true,
      data: {
        workflow_id: workflowId,
        status: 'started',
        message: `Finding ${count} leads in ${industry} industry`,
        estimated_completion: new Date(Date.now() + 600000).toISOString(), // 10 minutes from now
        progress: 0,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Get lead analytics
export async function getLeadAnalytics(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { period = '30d' } = req.query;

    // Mock analytics data
    const analytics = {
      summary: {
        total_leads: 24,
        new_leads: 8,
        qualified_leads: 12,
        converted_leads: 3,
        conversion_rate: 12.5,
        average_deal_size: 18750,
      },
      funnel: [
        { stage: 'new', count: 8, percentage: 33.3 },
        { stage: 'contacted', count: 6, percentage: 25.0 },
        { stage: 'qualified', count: 5, percentage: 20.8 },
        { stage: 'proposal_sent', count: 3, percentage: 12.5 },
        { stage: 'negotiating', count: 2, percentage: 8.3 },
        { stage: 'closed_won', count: 3, percentage: 12.5 },
      ],
      sources: [
        { source: 'web_scrape', count: 12, percentage: 50.0 },
        { source: 'linkedin', count: 6, percentage: 25.0 },
        { source: 'referral', count: 4, percentage: 16.7 },
        { source: 'website', count: 2, percentage: 8.3 },
      ],
      industries: [
        { industry: 'technology', count: 14, percentage: 58.3 },
        { industry: 'e-commerce', count: 6, percentage: 25.0 },
        { industry: 'software', count: 4, percentage: 16.7 },
      ],
      performance: {
        average_response_time: '2.3 hours',
        average_sales_cycle: '42 days',
        top_performing_agent: 'Alex',
        win_rate: 37.5,
      },
    };

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    throw error;
  }
}

// Create and send outreach emails
export async function createOutreach(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { lead_ids, template, personalization } = req.body;

    // Mock outreach creation
    const outreachId = `outreach_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    logger.info('Outreach campaign created', {
      userId,
      outreachId,
      lead_count: lead_ids.length,
      template,
    });

    res.status(201).json({
      success: true,
      data: {
        outreach_id: outreachId,
        lead_ids,
        template,
        status: 'scheduled',
        scheduled_for: new Date(Date.now() + 300000).toISOString(), // 5 minutes from now
        estimated_sends: lead_ids.length,
      },
    });
  } catch (error) {
    throw error;
  }
}