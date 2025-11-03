import { Router } from 'express';
import { authenticate } from './middleware/auth';
import * as authController from './controllers/authController';
import * as chatController from './controllers/chatController';
import * as dashboardController from './controllers/dashboardController';
import * as agentsController from './controllers/agentsController';
import * as clientsController from './controllers/clientsController';
import * as financeController from './controllers/financeController';
import * as leadsController from './controllers/leadsController';
import * as projectsController from './controllers/projectsController';
import * as approvalsController from './controllers/approvalsController';

const router = Router();

// Authentication routes (no auth middleware)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/refresh', authController.refresh);
router.post('/auth/logout', authController.logout);
router.post('/auth/forgot-password', authController.forgotPassword);
router.get('/auth/me', authenticate, authController.getCurrentUser);

// Chat routes (require auth)
router.post('/chat/message', authenticate, chatController.sendMessage);
router.get('/messages', authenticate, chatController.getMessageHistory);
router.get('/chat/typing-indicators', authenticate, chatController.getTypingIndicators);

// Dashboard routes (require auth)
router.get('/dashboard/summary', authenticate, dashboardController.getDailySummary);
router.get('/dashboard/cashflow', authenticate, dashboardController.getCashFlow);
router.get('/dashboard/leads', authenticate, dashboardController.getLeadsPipeline);
router.get('/dashboard/projects', authenticate, dashboardController.getActiveProjects);
router.get('/dashboard/tasks', authenticate, dashboardController.getTaskQueue);

// Agent routes (require auth)
router.get('/agents', authenticate, agentsController.getAgents);
router.get('/agents/:id', authenticate, agentsController.getAgent);
router.put('/agents/:id/settings', authenticate, agentsController.updateAgentSettings);
router.post('/agents/:id/execute', authenticate, agentsController.executeAgentTask);
router.get('/agents/:id/activity', authenticate, agentsController.getAgentActivity);
router.post('/agents/:id/train', authenticate, agentsController.trainAgent);

// Client routes (require auth)
router.get('/clients', authenticate, clientsController.getClients);
router.post('/clients', authenticate, clientsController.createClient);
router.get('/clients/:id', authenticate, clientsController.getClient);
router.put('/clients/:id', authenticate, clientsController.updateClient);
router.delete('/clients/:id', authenticate, clientsController.deleteClient);
router.get('/clients/:id/projects', authenticate, clientsController.getClientProjects);
router.get('/clients/:id/transactions', authenticate, clientsController.getClientTransactions);

// Finance routes (require auth)
router.get('/finance/transactions', authenticate, financeController.getTransactions);
router.post('/finance/invoices', authenticate, financeController.createInvoice);
router.get('/finance/cashflow', authenticate, financeController.getCashFlow);
router.post('/finance/expenses', authenticate, financeController.recordExpense);
router.get('/finance/reports', authenticate, financeController.generateReports);
router.post('/finance/payment-links', authenticate, financeController.generatePaymentLink);
router.get('/finance/projections', authenticate, financeController.getProjections);

// Lead routes (require auth)
router.get('/leads', authenticate, leadsController.getLeads);
router.post('/leads', authenticate, leadsController.createLead);
router.put('/leads/:id', authenticate, leadsController.updateLead);
router.post('/leads/scrape', authenticate, leadsController.scrapeLeads);
router.get('/leads/analytics', authenticate, leadsController.getLeadAnalytics);
router.post('/leads/outreach', authenticate, leadsController.createOutreach);

// Project routes (require auth)
router.get('/projects', authenticate, projectsController.getProjects);
router.post('/projects', authenticate, projectsController.createProject);
router.get('/projects/:id', authenticate, projectsController.getProject);
router.put('/projects/:id', authenticate, projectsController.updateProject);
router.post('/projects/:id/tasks', authenticate, projectsController.createProjectTasks);
router.get('/projects/analytics', authenticate, projectsController.getProjectAnalytics);

// Approval routes (require auth)
router.get('/approvals/pending', authenticate, approvalsController.getPendingApprovals);
router.post('/approvals/:id/approve', authenticate, approvalsController.approveAction);
router.post('/approvals/:id/reject', authenticate, approvalsController.rejectAction);
router.put('/approvals/:id/edit', authenticate, approvalsController.editAction);
router.get('/approvals/history', authenticate, approvalsController.getApprovalHistory);
router.post('/approvals/batch', authenticate, approvalsController.batchApprovals);

export default router;