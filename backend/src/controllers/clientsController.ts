import { Request, Response } from 'express';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

// Get all clients
export async function getClients(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { status, industry, limit = 50, offset = 0 } = req.query;

    // Mock clients data
    const clients = [
      {
        id: 'client_1',
        name: 'Sam Watson',
        email: 'sam@company.com',
        company: 'Watson Co',
        phone: '+1-555-0123',
        industry: 'technology',
        status: 'active',
        contract_value: 299,
        billing_cycle: 'monthly',
        start_date: '2024-01-01',
        health_score: 85,
        notes: 'Long-term client, very satisfied with services',
        tags: ['priority', 'technology'],
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-08T00:00:00Z',
      },
      {
        id: 'client_2',
        name: 'Sarah Johnson',
        email: 'sarah@growthcorp.com',
        company: 'Growth Corp',
        phone: '+1-555-0124',
        industry: 'e-commerce',
        status: 'active',
        contract_value: 2500,
        billing_cycle: 'monthly',
        start_date: '2023-12-15',
        health_score: 92,
        notes: 'Growing fast, potential for upsell',
        tags: ['high-value', 'e-commerce'],
        created_at: '2023-12-15T00:00:00Z',
        updated_at: '2024-01-08T00:00:00Z',
      },
    ];

    res.json({
      success: true,
      data: {
        clients,
        total: clients.length,
        has_more: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Create new client
export async function createClient(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const clientData = req.body;

    // Mock client creation
    const newClient = {
      id: `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      ...clientData,
      health_score: 50,
      status: 'active',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    logger.info('Client created', { userId, clientId: newClient.id });

    res.status(201).json({
      success: true,
      data: newClient,
    });
  } catch (error) {
    throw error;
  }
}

// Get specific client
export async function getClient(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { clientId } = req.params;

    // Mock client data with additional details
    const client = {
      id: clientId,
      name: 'Sam Watson',
      email: 'sam@company.com',
      company: 'Watson Co',
      phone: '+1-555-0123',
      industry: 'technology',
      status: 'active',
      contract_value: 299,
      billing_cycle: 'monthly',
      start_date: '2024-01-01',
      payment_terms: 30,
      health_score: 85,
      notes: 'Long-term client, very satisfied with services',
      tags: ['priority', 'technology'],
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-08T00:00:00Z',
      projects: [
        {
          id: 'proj_1',
          name: 'Website Automation',
          status: 'in_progress',
          completion_percentage: 75,
        },
      ],
      transactions: [
        {
          id: 'txn_1',
          amount: 299,
          type: 'payment_received',
          status: 'completed',
          date: '2024-01-05',
        },
      ],
    };

    res.json({
      success: true,
      data: client,
    });
  } catch (error) {
    throw error;
  }
}

// Update client
export async function updateClient(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { clientId } = req.params;
    const updates = req.body;

    logger.info('Client updated', { userId, clientId, updates });

    res.json({
      success: true,
      message: 'Client updated successfully',
      data: {
        id: clientId,
        ...updates,
        updated_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    throw error;
  }
}

// Delete client
export async function deleteClient(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { clientId } = req.params;

    logger.info('Client deleted', { userId, clientId });

    res.json({
      success: true,
      message: 'Client deleted successfully',
    });
  } catch (error) {
    throw error;
  }
}

// Get client projects
export async function getClientProjects(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { clientId } = req.params;

    // Mock projects data
    const projects = [
      {
        id: 'proj_1',
        client_id: clientId,
        name: 'Website Automation Suite',
        description: 'Full website automation with n8n workflows',
        status: 'in_progress',
        start_date: '2024-01-01',
        end_date: '2024-01-30',
        completion_percentage: 75,
        budget: 5000,
        actual_spend: 3750,
      },
    ];

    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    throw error;
  }
}

// Get client transactions
export async function getClientTransactions(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { clientId } = req.params;

    // Mock transactions data
    const transactions = [
      {
        id: 'txn_1',
        client_id: clientId,
        amount: 299,
        type: 'invoice_sent',
        status: 'completed',
        date: '2024-01-01',
        description: 'Monthly retainer - January',
      },
      {
        id: 'txn_2',
        client_id: clientId,
        amount: 299,
        type: 'payment_received',
        status: 'completed',
        date: '2024-01-05',
        description: 'Monthly payment received',
      },
    ];

    res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    throw error;
  }
}