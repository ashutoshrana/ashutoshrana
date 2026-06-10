import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  fetchClients,
  createClient,
  updateClient,
  deleteClient,
} from '../../store/slices/clientSlice';
import { ClientForm } from './ClientForm';

export const ClientList = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.client);
  const [formState, setFormState] = useState({ open: false, client: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleSubmit = async (data) => {
    if (formState.client) {
      await dispatch(updateClient({ id: formState.client.id, data }));
    } else {
      await dispatch(createClient(data));
    }
    setFormState({ open: false, client: null });
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteClient(deleteConfirm.id));
    setDeleteConfirm({ open: false, id: null });
  };

  // Map snake_case API fields to the camelCase the form expects.
  const toFormShape = (c) => ({
    name: c.name,
    email: c.email,
    phone: c.phone,
    address: c.address,
    city: c.city,
    state: c.state,
    postalCode: c.postal_code,
    country: c.country,
    taxId: c.tax_id,
    id: c.id,
  });

  if (loading && clients.length === 0) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" onClick={() => setFormState({ open: true, client: null })}>
          New Client
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} hover>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.city}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => setFormState({ open: true, client: toFormShape(client) })}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => setDeleteConfirm({ open: true, id: client.id })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {clients.length === 0 && !loading && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No clients yet. Add a client to start invoicing.
        </Alert>
      )}

      {formState.open && (
        <ClientForm
          open={formState.open}
          initialData={formState.client}
          onClose={() => setFormState({ open: false, client: null })}
          onSubmit={handleSubmit}
        />
      )}

      <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })}>
        <DialogTitle>Delete Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this client also removes their invoices. This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClientList;
