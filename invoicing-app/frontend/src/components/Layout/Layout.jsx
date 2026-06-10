import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10,
          px: 3,
          pb: 4,
          transition: 'margin-left 0.3s ease',
          marginLeft: sidebarOpen ? 0 : '-240px',
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
};

export default Layout;
