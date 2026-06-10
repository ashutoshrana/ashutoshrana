import { jsPDF } from 'jspdf';
import { formatCurrency, formatDate } from '../../utils/formatters';

// Generates and downloads a simple PDF representation of an invoice.
export const generateInvoicePDF = (invoice) => {
  const doc = new jsPDF();
  const client = invoice.client || {};

  doc.setFontSize(20);
  doc.text('INVOICE', 14, 20);

  doc.setFontSize(11);
  doc.text(`Invoice #: ${invoice.invoice_number}`, 14, 32);
  doc.text(`Issue Date: ${formatDate(invoice.issue_date)}`, 14, 39);
  doc.text(`Due Date: ${formatDate(invoice.due_date)}`, 14, 46);
  doc.text(`Status: ${(invoice.status || '').toUpperCase()}`, 14, 53);

  doc.text('Bill To:', 140, 32);
  doc.text(client.name || '', 140, 39);
  if (client.email) doc.text(client.email, 140, 46);

  let y = 70;
  doc.setFontSize(10);
  doc.text('Description', 14, y);
  doc.text('Qty', 110, y, { align: 'right' });
  doc.text('Unit', 140, y, { align: 'right' });
  doc.text('Amount', 196, y, { align: 'right' });
  doc.line(14, y + 2, 196, y + 2);
  y += 10;

  (invoice.items || []).forEach((item) => {
    doc.text(String(item.description), 14, y);
    doc.text(String(item.quantity), 110, y, { align: 'right' });
    doc.text(formatCurrency(item.unit_price), 140, y, { align: 'right' });
    doc.text(formatCurrency(item.amount), 196, y, { align: 'right' });
    y += 8;
  });

  y += 4;
  doc.line(120, y, 196, y);
  y += 8;
  doc.text(`Subtotal: ${formatCurrency(invoice.subtotal)}`, 196, y, { align: 'right' });
  y += 7;
  doc.text(`Tax: ${formatCurrency(invoice.tax_amount)}`, 196, y, { align: 'right' });
  y += 7;
  doc.setFontSize(12);
  doc.text(`Total: ${formatCurrency(invoice.total_amount)}`, 196, y, { align: 'right' });

  doc.save(`${invoice.invoice_number}.pdf`);
};

export default generateInvoicePDF;
