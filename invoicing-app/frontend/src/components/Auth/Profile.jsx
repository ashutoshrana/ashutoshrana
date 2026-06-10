import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, TextField, Button, Typography, Alert, Snackbar } from '@mui/material';
import { getProfile } from '../../store/slices/authSlice';
import * as authService from '../../services/authService';

export const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ firstName: '', lastName: '', companyName: '', phone: '', address: '' });
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        companyName: user.company_name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setError('');
    try {
      await authService.updateProfile(form);
      await dispatch(getProfile());
      setToast('Profile updated');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="First Name" name="firstName" value={form.firstName} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Email" value={user?.email || ''} disabled />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Company" name="companyName" value={form.companyName} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline minRows={2} label="Address" name="address" value={form.address} onChange={handleChange} />
        </Grid>
      </Grid>

      <Button variant="contained" sx={{ mt: 3 }} onClick={handleSave}>
        Save Changes
      </Button>

      <Snackbar open={!!toast} autoHideDuration={3000} onClose={() => setToast('')} message={toast} />
    </Paper>
  );
};

export default Profile;
