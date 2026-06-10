import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { fetchClients } from '../../store/slices/clientSlice';
import * as invoiceService from '../../services/invoiceService';
import { formatCurrency } from '../../utils/formatters';
import { validateInvoiceData } from '../../utils/validators';

const blankItem = { description: '', quantity: 1, unitPrice: 0, taxRate: 0 };

export const InvoiceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clients } = useSelector((state) => state.client);

  const [form, setForm] = useState({
    clientId: '',
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date().toISOString().slice(0, 10),
    notes: '',
    terms: '',
  });
  const [items, setItems] = useState([{ ...blankItem }]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleItemChange = (index, field, value) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, [field]: value } : it)));
  };

  const addItem = () => setItems((prev) => [...prev, { ...blankItem }]);
  const removeItem = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

  const lineTotal = (it) => Number(it.quantity || 0) * Number(it.unitPrice || 0);
  const subtotal = items.reduce((sum, it) => sum + lineTotal(it), 0);
  const taxTotal = items.reduce(
    (sum, it) => sum + (lineTotal(it) * Number(it.taxRate || 0)) / 100,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationErrors = validateInvoiceData(form);
    if (Object.keys(validationErrors).length > 0) {
      setError(Object.values(validationErrors)[0]);
      return;
    }

    const validItems = items.filter((it) => it.description.trim() !== '');
    if (validItems.length === 0) {
      setError('Add at least one line item with a description');
      return;
    }

    setSaving(true);
    try {
      const response = await invoiceService.createInvoice({
        clientId: Number(form.clientId),
        issueDate: form.issueDate,
        dueDate: form.dueDate,
        notes: form.notes,
        terms: form.terms,
      });
      const invoiceId = response.data.id;

      for (const it of validItems) {
        await invoiceService.addInvoiceItem(invoiceId, {
          description: it.description,
          quantity: Number(it.quantity),
          unitPrice: Number(it.unitPrice),
          taxRate: Number(it.taxRate),
        });
      }

      navigate(`/invoices/${invoiceId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create invoice');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        New Invoice
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              label="Client"
              name="clientId"
              value={form.clientId}
              onChange={handleFormChange}
            >
              {clients.length === 0 && <MenuItem disabled>No clients — create one first</MenuItem>}
              {clients.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="date"
              fullWidth
              label="Issue Date"
              name="issueDate"
              InputLabelProps={{ shrink: true }}
              value={form.issueDate}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="date"
              fullWidth
              label="Due Date"
              name="dueDate"
              InputLabelProps={{ shrink: true }}
              value={form.dueDate}
              onChange={handleFormChange}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          Line Items
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Tax %</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((it, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={it.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    size="small"
                    sx={{ width: 80 }}
                    value={it.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    size="small"
                    sx={{ width: 110 }}
                    value={it.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    size="small"
                    sx={{ width: 80 }}
                    value={it.taxRate}
                    onChange={(e) => handleItemChange(index, 'taxRate', e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">{formatCurrency(lineTotal(it))}</TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button startIcon={<AddIcon />} onClick={addItem} sx={{ mt: 1 }}>
          Add Item
        </Button>

        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Typography>Subtotal: {formatCurrency(subtotal)}</Typography>
          <Typography>Tax: {formatCurrency(taxTotal)}</Typography>
          <Typography variant="h6">Total: {formatCurrency(subtotal + taxTotal)}</Typography>
        </Box>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              label="Notes"
              name="notes"
              value={form.notes}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              multiline
              minRows={2}
              label="Terms"
              name="terms"
              value={form.terms}
              onChange={handleFormChange}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" disabled={saving}>
            {saving ? 'Saving...' : 'Create Invoice'}
          </Button>
          <Button onClick={() => navigate('/invoices')}>Cancel</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default InvoiceForm;
