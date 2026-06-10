import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  TextField,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { PictureAsPdf as PdfIcon } from '@mui/icons-material';
import * as invoiceService from '../../services/invoiceService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { generateInvoicePDF } from './InvoicePDF';

const statuses = ['draft', 'sent', 'paid', 'overdue'];

export const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const response = await invoiceService.getInvoiceById(id);
      setInvoice(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load invoice');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleStatusChange = async (e) => {
    try {
      await invoiceService.updateInvoiceStatus(id, e.target.value);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!invoice) return null;

  const client = invoice.client || {};

  return (
    <Paper sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
          <Typography variant="h5">{invoice.invoice_number}</Typography>
          <Chip label={(invoice.status || '').toUpperCase()} size="small" sx={{ mt: 1 }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            select
            size="small"
            label="Status"
            value={invoice.status}
            onChange={handleStatusChange}
            sx={{ minWidth: 140 }}
          >
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s.toUpperCase()}
              </MenuItem>
            ))}
          </TextField>
          <Button startIcon={<PdfIcon />} variant="outlined" onClick={() => generateInvoicePDF(invoice)}>
            PDF
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Bill To
          </Typography>
          <Typography>{client.name}</Typography>
          <Typography variant="body2">{client.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
          <Typography variant="body2">Issue Date: {formatDate(invoice.issue_date)}</Typography>
          <Typography variant="body2">Due Date: {formatDate(invoice.due_date)}</Typography>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Qty</TableCell>
            <TableCell align="right">Unit Price</TableCell>
            <TableCell align="right">Tax %</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(invoice.items || []).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.description}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{formatCurrency(item.unit_price)}</TableCell>
              <TableCell align="right">{item.tax_rate}%</TableCell>
              <TableCell align="right">{formatCurrency(item.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ textAlign: 'right', mt: 2 }}>
        <Typography>Subtotal: {formatCurrency(invoice.subtotal)}</Typography>
        <Typography>Tax: {formatCurrency(invoice.tax_amount)}</Typography>
        <Typography variant="h6">Total: {formatCurrency(invoice.total_amount)}</Typography>
      </Box>

      {(invoice.notes || invoice.terms) && <Divider sx={{ my: 3 }} />}
      {invoice.notes && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2">Notes</Typography>
          <Typography variant="body2">{invoice.notes}</Typography>
        </Box>
      )}
      {invoice.terms && (
        <Box>
          <Typography variant="subtitle2">Terms</Typography>
          <Typography variant="body2">{invoice.terms}</Typography>
        </Box>
      )}

      <Box sx={{ mt: 3 }}>
        <Button onClick={() => navigate('/invoices')}>Back to Invoices</Button>
      </Box>
    </Paper>
  );
};

export default InvoiceDetail;
