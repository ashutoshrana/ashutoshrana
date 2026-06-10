import { Invoice } from '../models/Invoice.js';
import { Client } from '../models/Client.js';
import logger from '../utils/logger.js';

export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.userId, req.body);
    res.status(201).json({ success: true, message: 'Invoice created successfully', data: invoice });
  } catch (error) {
    logger.error('Create invoice error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create invoice' });
  }
};

export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id, req.userId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    const client = await Client.findById(invoice.client_id, req.userId);

    res.json({ success: true, data: { ...invoice, client } });
  } catch (error) {
    logger.error('Get invoice error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch invoice' });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const { status, clientId } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (clientId) filter.clientId = clientId;

    const invoices = await Invoice.findAllByUser(req.userId, filter);
    res.json({ success: true, data: invoices });
  } catch (error) {
    logger.error('Get all invoices error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch invoices' });
  }
};

export const addInvoiceItem = async (req, res) => {
  try {
    const item = await Invoice.addItem(req.params.id, req.userId, req.body);
    res.status(201).json({ success: true, message: 'Item added successfully', data: item });
  } catch (error) {
    logger.error('Add invoice item error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to add item' });
  }
};

export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.update(req.params.id, req.userId, req.body);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.json({ success: true, message: 'Invoice updated successfully', data: invoice });
  } catch (error) {
    logger.error('Update invoice error:', error);
    res.status(500).json({ success: false, message: 'Failed to update invoice' });
  }
};

export const updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const invoice = await Invoice.updateStatus(req.params.id, req.userId, status);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.json({ success: true, message: 'Invoice status updated successfully', data: invoice });
  } catch (error) {
    logger.error('Update status error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to update status' });
  }
};

export const deleteInvoice = async (req, res) => {
  try {
    const result = await Invoice.delete(req.params.id, req.userId);
    if (!result) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.json({ success: true, message: 'Invoice deleted successfully' });
  } catch (error) {
    logger.error('Delete invoice error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete invoice' });
  }
};

export const deleteInvoiceItem = async (req, res) => {
  try {
    const { invoiceId, itemId } = req.params;

    // Verify invoice ownership before mutating its items.
    const invoice = await Invoice.findById(invoiceId, req.userId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: 'Invoice not found' });
    }

    await Invoice.deleteItem(invoiceId, itemId);

    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (error) {
    logger.error('Delete invoice item error:', error);
    res.status(500).json({ success: false, message: 'Failed to delete item' });
  }
};
