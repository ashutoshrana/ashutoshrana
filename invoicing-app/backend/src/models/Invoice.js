import { query } from '../config/database.js';
import { round2 } from '../utils/helpers.js';

export class Invoice {
  static async create(userId, data) {
    const { clientId, issueDate, dueDate, notes, terms } = data;

    const client = await query(
      'SELECT id FROM clients WHERE id = $1 AND user_id = $2',
      [clientId, userId]
    );
    if (client.rows.length === 0) {
      throw new Error('Client not found');
    }

    const invoiceNumber = await this.generateInvoiceNumber(userId);

    const result = await query(
      `INSERT INTO invoices (user_id, client_id, invoice_number, issue_date, due_date, notes, terms, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'draft')
       RETURNING *`,
      [userId, clientId, invoiceNumber, issueDate, dueDate, notes, terms]
    );

    return result.rows[0];
  }

  static async addItem(invoiceId, userId, item) {
    const { description, quantity, unitPrice, taxRate } = item;

    const invoice = await query(
      'SELECT id FROM invoices WHERE id = $1 AND user_id = $2',
      [invoiceId, userId]
    );
    if (invoice.rows.length === 0) {
      throw new Error('Invoice not found');
    }

    const amount = round2(Number(quantity) * Number(unitPrice));

    const result = await query(
      `INSERT INTO invoice_items (invoice_id, description, quantity, unit_price, tax_rate, amount)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [invoiceId, description, quantity, unitPrice, taxRate || 0, amount]
    );

    await this.updateInvoiceTotals(invoiceId);

    return result.rows[0];
  }

  static async deleteItem(invoiceId, itemId) {
    await query('DELETE FROM invoice_items WHERE id = $1 AND invoice_id = $2', [itemId, invoiceId]);
    await this.updateInvoiceTotals(invoiceId);
  }

  static async updateInvoiceTotals(invoiceId) {
    const items = await query(
      `SELECT COALESCE(SUM(amount), 0) AS subtotal,
              COALESCE(SUM((amount * tax_rate) / 100), 0) AS tax_amount
       FROM invoice_items WHERE invoice_id = $1`,
      [invoiceId]
    );

    const subtotal = round2(items.rows[0].subtotal);
    const taxAmount = round2(items.rows[0].tax_amount);
    const totalAmount = round2(subtotal + taxAmount);

    await query(
      'UPDATE invoices SET subtotal = $1, tax_amount = $2, total_amount = $3 WHERE id = $4',
      [subtotal, taxAmount, totalAmount, invoiceId]
    );
  }

  static async findById(id, userId) {
    const invoice = await query(
      'SELECT * FROM invoices WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    if (invoice.rows.length === 0) return null;

    const items = await query(
      'SELECT * FROM invoice_items WHERE invoice_id = $1 ORDER BY id ASC',
      [id]
    );

    return { ...invoice.rows[0], items: items.rows };
  }

  static async findAllByUser(userId, filter = {}) {
    // Join clients so the list view can show the client name in one query.
    let sql = `
      SELECT i.*, c.name AS client_name, c.email AS client_email
      FROM invoices i
      JOIN clients c ON c.id = i.client_id
      WHERE i.user_id = $1`;
    const params = [userId];

    if (filter.status) {
      sql += ` AND i.status = $${params.length + 1}`;
      params.push(filter.status);
    }

    if (filter.clientId) {
      sql += ` AND i.client_id = $${params.length + 1}`;
      params.push(filter.clientId);
    }

    sql += ' ORDER BY i.created_at DESC';

    const result = await query(sql, params);
    return result.rows;
  }

  static async update(id, userId, data) {
    const { notes, terms } = data;

    const result = await query(
      'UPDATE invoices SET notes = $1, terms = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [notes, terms, id, userId]
    );

    return result.rows[0];
  }

  static async updateStatus(id, userId, status) {
    const validStatuses = ['draft', 'sent', 'paid', 'overdue'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const result = await query(
      'UPDATE invoices SET status = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [status, id, userId]
    );

    return result.rows[0];
  }

  static async delete(id, userId) {
    const result = await query(
      'DELETE FROM invoices WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, userId]
    );
    return result.rows[0];
  }

  static async generateInvoiceNumber(userId) {
    const year = new Date().getFullYear();
    const result = await query(
      `SELECT COUNT(*) AS count FROM invoices
       WHERE user_id = $1 AND EXTRACT(YEAR FROM created_at) = $2`,
      [userId, year]
    );

    const nextNumber = Number(result.rows[0].count || 0) + 1;
    return `INV-${year}-${String(nextNumber).padStart(5, '0')}`;
  }

  static async getStats(userId) {
    const result = await query(
      `SELECT
         COUNT(*) AS total_invoices,
         COALESCE(SUM(total_amount), 0) AS total_revenue,
         COALESCE(SUM(paid_amount), 0) AS paid_amount,
         COALESCE(SUM(total_amount - paid_amount), 0) AS pending_amount,
         COUNT(*) FILTER (WHERE status = 'draft') AS draft_count,
         COUNT(*) FILTER (WHERE status = 'sent') AS sent_count,
         COUNT(*) FILTER (WHERE status = 'paid') AS paid_count,
         COUNT(*) FILTER (WHERE status = 'overdue') AS overdue_count
       FROM invoices WHERE user_id = $1`,
      [userId]
    );
    return result.rows[0];
  }
}
