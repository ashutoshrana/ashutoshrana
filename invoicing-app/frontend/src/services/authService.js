import api from './api';

export const register = (userData) => api.post('/auth/register', userData);

export const login = (credentials) => api.post('/auth/login', credentials);

export const getProfile = () => api.get('/auth/profile');

export const updateProfile = (profileData) => api.put('/auth/profile', profileData);

export const changePassword = (passwords) => api.post('/auth/change-password', passwords);
