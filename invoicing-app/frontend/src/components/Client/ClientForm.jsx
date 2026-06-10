import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid, TextField, Button, Alert } from '@mui/material';
import { validateEmail } from '../../utils/validators';

const emptyClient = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  taxId: '',
};

export const ClientForm = ({ open, initialData, onClose, onSubmit }) => {
  const [form, setForm] = useState(initialData || emptyClient);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name.trim()) return setError('Name is required');
    if (!validateEmail(form.email)) return setError('A valid email is required');
    setError('');
    await onSubmit(form);
  };

  const fields = [
    { name: 'name', label: 'Name', required: true, size: 6 },
    { name: 'email', label: 'Email', required: true, size: 6 },
    { name: 'phone', label: 'Phone', size: 6 },
    { name: 'taxId', label: 'Tax ID', size: 6 },
    { name: 'address', label: 'Address', size: 12 },
    { name: 'city', label: 'City', size: 6 },
    { name: 'state', label: 'State', size: 6 },
    { name: 'postalCode', label: 'Postal Code', size: 6 },
    { name: 'country', label: 'Country', size: 6 },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Client' : 'New Client'}</DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2, mt: 1 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {fields.map((f) => (
            <Grid item xs={12} sm={f.size} key={f.name}>
              <TextField
                fullWidth
                required={f.required}
                label={f.label}
                name={f.name}
                value={form[f.name] || ''}
                onChange={handleChange}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientForm;
