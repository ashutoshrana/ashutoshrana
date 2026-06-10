import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import { formatCurrency } from '../../utils/formatters';
import * as dashboardService from '../../services/dashboardService';

const emptyStats = {
  totalInvoices: 0,
  totalRevenue: 0,
  paidAmount: 0,
  pendingAmount: 0,
  draftCount: 0,
  sentCount: 0,
  paidCount: 0,
  overdueCount: 0,
};

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState(emptyStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await dashboardService.getStats();
        if (active) setStats(response.data);
      } catch (err) {
        if (active) setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const summaryCards = [
    { label: 'Total Invoices', value: stats.totalInvoices, color: 'inherit' },
    { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), color: '#4caf50' },
    { label: 'Paid Amount', value: formatCurrency(stats.paidAmount), color: '#2196f3' },
    { label: 'Pending Amount', value: formatCurrency(stats.pendingAmount), color: '#ff9800' },
  ];

  const statusCards = [
    { label: 'Drafts', value: stats.draftCount, color: 'inherit' },
    { label: 'Sent', value: stats.sentCount, color: 'inherit' },
    { label: 'Paid', value: stats.paidCount, color: '#4caf50' },
    { label: 'Overdue', value: stats.overdueCount, color: '#f44336' },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Welcome, {user?.first_name || 'there'}!
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {card.label}
                </Typography>
                <Typography variant="h5" sx={{ color: card.color }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {statusCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.label}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: card.color }}>
                  {card.value}
                </Typography>
                <Typography color="textSecondary">{card.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
