import { Request, Response } from 'express';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

// Get transactions
export async function getTransactions(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { type, status, limit = 50, offset = 0 } = req.query;

    // Mock transactions data
    const transactions = [
      {
        id: 'txn_1',
        client_name: 'Growth Corp',
        amount: 2500,
        type: 'payment_received',
        category: 'revenue',
        status: 'completed',
        date: '2024-01-08',
        description: 'Monthly retainer - January',
        reference_number: 'PAY-001',
        payment_method: 'bank_transfer',
        processor_type: 'stripe',
        recurring: true,
        recurring_interval: 'monthly',
      },
      {
        id: 'txn_2',
        client_name: 'TechStart Inc',
        amount: 1800,
        type: 'invoice_sent',
        category: 'revenue',
        status: 'pending',
        date: '2024-01-07',
        description: 'E-commerce automation setup',
        reference_number: 'INV-002',
        payment_method: null,
        processor_type: null,
        recurring: false,
      },
      {
        id: 'txn_3',
        amount: 299,
        type: 'expense',
        category: 'software',
        status: 'completed',
        date: '2024-01-05',
        description: 'Monthly software subscriptions',
        reference_number: 'EXP-001',
        payment_method: 'credit_card',
        processor_type: 'stripe',
        recurring: true,
        recurring_interval: 'monthly',
      },
    ];

    res.json({
      success: true,
      data: {
        transactions,
        total: transactions.length,
        has_more: false,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Create and send invoice
export async function createInvoice(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { client_id, amount, description, due_date } = req.body;

    // Mock invoice creation
    const invoice = {
      id: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      client_id,
      amount,
      description,
      status: 'draft',
      due_date,
      created_at: new Date().toISOString(),
      payment_link: `https://payment.stripe.com/pay/${Math.random().toString(36).substr(2, 20)}`,
    };

    logger.info('Invoice created', { userId, invoiceId: invoice.id, amount });

    res.status(201).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    throw error;
  }
}

// Get cash flow analysis
export async function getCashFlow(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { period = '30d' } = req.query;

    // Mock cash flow data
    const cashFlow = {
      summary: {
        total_income: 18500,
        total_expenses: 9200,
        net_cash_flow: 9300,
        profit_margin: 50.3,
      },
      trends: [
        { date: '2024-01-01', income: 1200, expenses: 800, net: 400 },
        { date: '2024-01-02', income: 2500, expenses: 1200, net: 1300 },
        { date: '2024-01-03', income: 800, expenses: 600, net: 200 },
        { date: '2024-01-04', income: 3200, expenses: 1800, net: 1400 },
        { date: '2024-01-05', income: 1500, expenses: 900, net: 600 },
        { date: '2024-01-06', income: 2800, expenses: 1400, net: 1400 },
        { date: '2024-01-07', income: 4500, expenses: 2500, net: 2000 },
        { date: '2024-01-08', income: 2000, expenses: 1000, net: 1000 },
      ],
      projections: {
        next_month_income: 22000,
        next_month_expenses: 11000,
        next_month_net: 11000,
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

// Record expense
export async function recordExpense(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const expenseData = req.body;

    // Mock expense creation
    const expense = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      type: 'expense',
      ...expenseData,
      status: 'completed',
      created_at: new Date().toISOString(),
    };

    logger.info('Expense recorded', { userId, expenseId: expense.id, amount: expense.amount });

    res.status(201).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    throw error;
  }
}

// Generate financial reports
export async function generateReports(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { report_type, period } = req.query;

    // Mock report generation
    const report = {
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: report_type,
      period,
      generated_at: new Date().toISOString(),
      data: {
        revenue: 18500,
        expenses: 9200,
        profit: 9300,
        profit_margin: 50.3,
        client_count: 8,
        average_invoice_amount: 2312.50,
        top_clients: [
          { name: 'Growth Corp', revenue: 7500 },
          { name: 'TechStart Inc', revenue: 5400 },
          { name: 'Digital Solutions', revenue: 3200 },
        ],
      },
      download_url: `/api/finance/reports/${report_type}/download`,
    };

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    throw error;
  }
}

// Generate payment link
export async function generatePaymentLink(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { client_id, amount, description } = req.body;

    // Mock payment link generation
    const paymentLink = {
      id: `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      client_id,
      amount,
      description,
      url: `https://payment.stripe.com/pay/${Math.random().toString(36).substr(2, 20)}`,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      created_at: new Date().toISOString(),
    };

    logger.info('Payment link generated', { userId, linkId: paymentLink.id, amount });

    res.status(201).json({
      success: true,
      data: paymentLink,
    });
  } catch (error) {
    throw error;
  }
}

// Get financial projections
export async function getProjections(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { timeframe = '6m' } = req.query;

    // Mock financial projections
    const projections = {
      timeframe,
      scenarios: {
        conservative: {
          monthly_revenue: [15000, 16000, 17000, 18000, 19000, 20000],
          monthly_expenses: [9000, 9200, 9400, 9600, 9800, 10000],
          net_profit: [6000, 6800, 7600, 8400, 9200, 10000],
        },
        realistic: {
          monthly_revenue: [18000, 19500, 21000, 22500, 24000, 25500],
          monthly_expenses: [9000, 9200, 9400, 9600, 9800, 10000],
          net_profit: [9000, 10300, 11600, 12900, 14200, 15500],
        },
        optimistic: {
          monthly_revenue: [22000, 24500, 27000, 29500, 32000, 34500],
          monthly_expenses: [9000, 9200, 9400, 9600, 9800, 10000],
          net_profit: [13000, 15300, 17600, 19900, 22200, 24500],
        },
      },
      key_metrics: {
        current_mrr: 18500,
        projected_mrr_6m: 25500,
        growth_rate: 37.8,
        churn_rate: 2.1,
        customer_acquisition_cost: 1250,
        customer_lifetime_value: 8900,
        ltv_cac_ratio: 7.1,
      },
    };

    res.json({
      success: true,
      data: projections,
    });
  } catch (error) {
    throw error;
  }
}