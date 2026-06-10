import api from './api';

export const getClients = () => api.get('/clients');

export const getClientById = (id) => api.get(`/clients/${id}`);

export const createClient = (clientData) => api.post('/clients', clientData);

export const updateClient = (id, data) => api.put(`/clients/${id}`, data);

export const deleteClient = (id) => api.delete(`/clients/${id}`);
