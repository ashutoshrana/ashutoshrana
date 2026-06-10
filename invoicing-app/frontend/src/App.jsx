import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from './store/slices/authSlice';

import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Profile } from './components/Auth/Profile';
import { Dashboard } from './components/Dashboard/Dashboard';
import { InvoiceList } from './components/Invoice/InvoiceList';
import { InvoiceForm } from './components/Invoice/InvoiceForm';
import { InvoiceDetail } from './components/Invoice/InvoiceDetail';
import { ClientList } from './components/Client/ClientList';
import { Layout } from './components/Layout/Layout';
import { ProtectedRoute } from './components/Common/ProtectedRoute';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Wraps a page in the authenticated app shell.
const protectedPage = (element) => (
  <ProtectedRoute>
    <Layout>{element}</Layout>
  </ProtectedRoute>
);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={protectedPage(<Dashboard />)} />
          <Route path="/invoices" element={protectedPage(<InvoiceList />)} />
          <Route path="/invoices/new" element={protectedPage(<InvoiceForm />)} />
          <Route path="/invoices/:id" element={protectedPage(<InvoiceDetail />)} />
          <Route path="/clients" element={protectedPage(<ClientList />)} />
          <Route path="/profile" element={protectedPage(<Profile />)} />

          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
          />
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
