import { Request, Response } from 'express';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

// Get pending approvals
export async function getPendingApprovals(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { agent, type, priority, limit = 50, offset = 0 } = req.query;

    // Mock pending approvals
    const pendingApprovals = [
      {
        id: 'approval_1',
        type: 'email',
        agent_name: 'Morgan',
        agent_type: 'finance',
        title: 'Send payment reminder to ABC Corp',
        description: 'Client ABC Corp is 7 days overdue on $5,000 invoice. Ready to send friendly payment reminder.',
        priority: 'high',
        created_at: '2024-01-08T09:15:00Z',
        requires_action_by: '2024-01-08T17:00:00Z',
        metadata: {
          client: 'ABC Corp',
          amount: 5000,
          days_overdue: 7,
          template: 'friendly_reminder',
        },
        preview: {
          subject: 'Friendly Reminder: Payment Overdue',
          body: 'Hi [Client Name],\n\nI hope you\'re doing well. I\'m writing to send a friendly reminder that payment for invoice #INV-001 in the amount of $5,000 is now 7 days overdue...',
        },
      },
      {
        id: 'approval_2',
        type: 'invoice',
        agent_name: 'Alex',
        agent_type: 'sales',
        title: 'Send $3,500 proposal to DataFlow Systems',
        description: 'Proposal ready for new lead DataFlow Systems. Includes scope, timeline, and pricing breakdown.',
        priority: 'medium',
        created_at: '2024-01-08T10:30:00Z',
        requires_action_by: '2024-01-09T12:00:00Z',
        metadata: {
          client: 'DataFlow Systems',
          amount: 3500,
          proposal_type: 'standard',
          duration: '3 months',
        },
        preview: {
          subject: 'Proposal: CRM Integration Services',
          body: 'Dear [Contact Name],\n\nThank you for your interest in our CRM integration services. Please find attached our detailed proposal...',
        },
      },
      {
        id: 'approval_3',
        type: 'expense',
        agent_name: 'Jordan',
        agent_type: 'operations',
        title: 'Approve $1,200 software subscription expense',
        description: 'New software subscription needed for project automation tools. Annual subscription.',
        priority: 'low',
        created_at: '2024-01-08T08:45:00Z',
        requires_action_by: '2024-01-10T17:00:00Z',
        metadata: {
          vendor: 'AutomationPro Tools',
          amount: 1200,
          billing_cycle: 'annual',
          category: 'software',
        },
        preview: {
          vendor: 'AutomationPro Tools',
          description: 'Professional automation platform subscription',
          justification: 'Essential for current project delivery and future automation capabilities',
        },
      },
    ];

    res.json({
      success: true,
      data: {
        approvals: pendingApprovals,
        total: pendingApprovals.length,
        has_more: false,
        summary: {
          high_priority: pendingApprovals.filter(a => a.priority === 'high').length,
          medium_priority: pendingApprovals.filter(a => a.priority === 'medium').length,
          low_priority: pendingApprovals.filter(a => a.priority === 'low').length,
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

// Approve pending action
export async function approveAction(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { approvalId } = req.params;

    logger.info('Action approved', { userId, approvalId });

    // Mock approval execution
    res.json({
      success: true,
      message: 'Action approved and executed successfully',
      data: {
        approval_id: approvalId,
        status: 'approved',
        approved_by: userId,
        approved_at: new Date().toISOString(),
        execution_result: {
          status: 'success',
          message: 'Email sent successfully',
          details: {
            sent_to: 'client@example.com',
            timestamp: new Date().toISOString(),
          },
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

// Reject pending action
export async function rejectAction(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { approvalId } = req.params;
    const { reason, feedback } = req.body;

    logger.info('Action rejected', { userId, approvalId, reason, feedback });

    // Mock rejection
    res.json({
      success: true,
      message: 'Action rejected',
      data: {
        approval_id: approvalId,
        status: 'rejected',
        rejected_by: userId,
        rejected_at: new Date().toISOString(),
        reason,
        feedback,
        next_steps: 'Agent will revise based on feedback',
      },
    });
  } catch (error) {
    throw error;
  }
}

// Edit pending action before approval
export async function editAction(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { approvalId } = req.params;
    const edits = req.body;

    logger.info('Action edited', { userId, approvalId, edits });

    // Mock edit
    res.json({
      success: true,
      message: 'Action updated successfully',
      data: {
        approval_id: approvalId,
        status: 'updated',
        updated_by: userId,
        updated_at: new Date().toISOString(),
        edits,
        preview: {
          ...edits,
          updated_at: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

// Get approval history
export async function getApprovalHistory(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { agent, type, limit = 50, offset = 0 } = req.query;

    // Mock approval history
    const approvalHistory = [
      {
        id: 'approval_hist_1',
        type: 'email',
        agent_name: 'Morgan',
        agent_type: 'finance',
        title: 'Send payment reminder to XYZ Corp',
        status: 'approved',
        action_taken: 'approved',
        created_at: '2024-01-07T14:30:00Z',
        reviewed_at: '2024-01-07T15:45:00Z',
        reviewed_by: userId,
        execution_result: {
          status: 'success',
          message: 'Email sent successfully',
          details: {
            sent_to: 'billing@xyzcorp.com',
            timestamp: '2024-01-07T15:46:00Z',
          },
        },
      },
      {
        id: 'approval_hist_2',
        type: 'proposal',
        agent_name: 'Alex',
        agent_type: 'sales',
        title: 'Send $8,000 proposal to InnovateTech',
        status: 'approved',
        action_taken: 'approved_with_changes',
        created_at: '2024-01-06T10:15:00Z',
        reviewed_at: '2024-01-06T11:30:00Z',
        reviewed_by: userId,
        edits_made: {
          pricing: 'Reduced from $9,000 to $8,000',
          timeline: 'Extended from 6 weeks to 8 weeks',
        },
        execution_result: {
          status: 'success',
          message: 'Proposal sent with requested changes',
        },
      },
      {
        id: 'approval_hist_3',
        type: 'expense',
        agent_name: 'Jordan',
        agent_type: 'operations',
        title: 'Approve marketing software expense',
        status: 'rejected',
        action_taken: 'rejected',
        created_at: '2024-01-05T09:00:00Z',
        reviewed_at: '2024-01-05T10:15:00Z',
        reviewed_by: userId,
        rejection_reason: 'Budget constraints - wait until next quarter',
        feedback: 'Consider open-source alternatives for now',
      },
    ];

    res.json({
      success: true,
      data: {
        history: approvalHistory,
        total: approvalHistory.length,
        has_more: false,
        summary: {
          approved: approvalHistory.filter(h => h.action_taken === 'approved').length,
          approved_with_changes: approvalHistory.filter(h => h.action_taken === 'approved_with_changes').length,
          rejected: approvalHistory.filter(h => h.action_taken === 'rejected').length,
        },
      },
    });
  } catch (error) {
    throw error;
  }
}

// Batch approval/rejection operations
export async function batchApprovals(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { approval_ids, action, reason, feedback } = req.body;

    // Mock batch operation
    const results = approval_ids.map((approvalId: string) => ({
      approval_id: approvalId,
      status: action,
      processed_at: new Date().toISOString(),
      result: action === 'approve' ? 'success' : 'rejected',
    }));

    logger.info('Batch approval processed', {
      userId,
      action,
      approval_count: approval_ids.length,
      results: results.filter(r => r.result === 'success').length,
    });

    res.json({
      success: true,
      message: `Batch ${action} processed successfully`,
      data: {
        processed_count: results.length,
        success_count: results.filter(r => r.result === 'success').length,
        failure_count: results.filter(r => r.result !== 'success').length,
        results,
      },
    });
  } catch (error) {
    throw error;
  }
}