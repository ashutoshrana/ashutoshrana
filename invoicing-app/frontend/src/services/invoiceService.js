import api from './api';

export const getInvoices = (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.status && filters.status !== 'all') {
    params.append('status', filters.status);
  }
  if (filters.clientId) {
    params.append('clientId', filters.clientId);
  }
  return api.get(`/invoices?${params.toString()}`);
};

export const getInvoiceById = (id) => api.get(`/invoices/${id}`);

export const createInvoice = (invoiceData) => api.post('/invoices', invoiceData);

export const updateInvoice = (id, data) => api.put(`/invoices/${id}`, data);

export const updateInvoiceStatus = (id, status) => api.patch(`/invoices/${id}/status`, { status });

export const addInvoiceItem = (invoiceId, item) => api.post(`/invoices/${invoiceId}/items`, item);

export const deleteInvoiceItem = (invoiceId, itemId) =>
  api.delete(`/invoices/${invoiceId}/items/${itemId}`);

export const deleteInvoice = (id) => api.delete(`/invoices/${id}`);
