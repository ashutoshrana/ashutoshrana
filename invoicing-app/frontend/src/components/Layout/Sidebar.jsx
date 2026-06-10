import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as InvoiceIcon,
  Contacts as ClientIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  const menuItems = [
    { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { label: 'Invoices', icon: InvoiceIcon, path: '/invoices' },
    { label: 'Clients', icon: ClientIcon, path: '/clients' },
    { label: 'Settings', icon: SettingsIcon, path: '/profile' },
  ];

  return (
    <Drawer
      variant="permanent"
      open={sidebarOpen}
      sx={{
        width: sidebarOpen ? 240 : 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 240 : 0,
          mt: 8,
          overflowX: 'hidden',
          transition: 'width 0.3s ease',
        },
      }}
    >
      <Box sx={{ p: 2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                backgroundColor: '#e3f2fd',
                '& .MuiListItemIcon-root': { color: '#1976d2' },
              },
            }}
          >
            <ListItemIcon>
              <item.icon />
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
