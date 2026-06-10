import { Box, CircularProgress } from '@mui/material';

export const LoadingSpinner = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4 }}>
    <CircularProgress />
  </Box>
);

export default LoadingSpinner;
