import { Invoice } from '../models/Invoice.js';
import logger from '../utils/logger.js';

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await Invoice.getStats(req.userId);

    res.json({
      success: true,
      data: {
        totalInvoices: Number(stats.total_invoices),
        totalRevenue: Number(stats.total_revenue),
        paidAmount: Number(stats.paid_amount),
        pendingAmount: Number(stats.pending_amount),
        draftCount: Number(stats.draft_count),
        sentCount: Number(stats.sent_count),
        paidCount: Number(stats.paid_count),
        overdueCount: Number(stats.overdue_count),
      },
    });
  } catch (error) {
    logger.error('Dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' });
  }
};
