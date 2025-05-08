import React, { useState, useMemo } from 'react';
import { Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
  useTheme,
  useMediaQuery,
  Button,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  People as UsersIcon,
  Store as VendorsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { Sun, Moon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../features/auth/store/authSlice';
import { toggleTheme } from '../store/themeSlice';
import { LAYOUT_STRINGS } from './constants';
import { ROUTES } from '../config/routes';

const {
  DRAWER_WIDTH,
  COLLAPSED_DRAWER_WIDTH,
  TOOLBAR_HEIGHT,
} = LAYOUT_STRINGS.DIMENSIONS;

const DashboardLayout = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const isDarkMode = theme.palette.mode === 'dark';

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const menuItems = useMemo(() => {
    if (!user) return [];

    return [
      ...(user.permissions?.includes(ROUTES.users?.permission) ? [{
        text: LAYOUT_STRINGS.DRAWER.MENU_ITEMS.USERS,
        icon: <UsersIcon />,
        path: ROUTES.users.path
      }] : []),
      ...(user.permissions?.includes(ROUTES.vendors?.permission) ? [{
        text: LAYOUT_STRINGS.DRAWER.MENU_ITEMS.VENDORS,
        icon: <VendorsIcon />,
        path: ROUTES.vendors.path
      }] : [])
    ];
  }, [user]);

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        minHeight: TOOLBAR_HEIGHT,
        px: 3,
      }}>
        {!isCollapsed && (
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {LAYOUT_STRINGS.DRAWER.ADMIN_PORTAL}
          </Typography>
        )}
        {!isMobile && (
          <IconButton onClick={handleCollapse} sx={{ color: 'primary.main' }}>
            {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List sx={{ px: 2, py: 1, flexGrow: 1 }}>
        {menuItems.map((item) => (
          <Tooltip title={isCollapsed ? item.text : ''} placement="right" key={item.text}>
            <ListItem 
              button 
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.12),
                  },
                },
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiListItemText-primary': {
                      color: location.pathname === item.path ? 'primary.main' : 'inherit',
                      fontWeight: location.pathname === item.path ? 500 : 400,
                    }
                  }}
                />
              )}
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <List sx={{ px: 2, py: 1 }}>
        <Tooltip title={isCollapsed ? LAYOUT_STRINGS.DRAWER.LOGOUT : ''} placement="right">
          <ListItem 
            button 
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              '&:hover': {
                bgcolor: alpha(theme.palette.error.main, 0.08),
                color: 'error.main',
                '& .MuiListItemIcon-root': {
                  color: 'error.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}><LogoutIcon /></ListItemIcon>
            {!isCollapsed && <ListItemText primary={LAYOUT_STRINGS.DRAWER.LOGOUT} />}
          </ListItem>
        </Tooltip>
      </List>
    </Box>
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Redirect to the first available route if current route is not accessible
  const currentRoute = Object.values(ROUTES).find(route => route.path === location.pathname);
  if (currentRoute?.permission && !user.permissions?.includes(currentRoute.permission)) {
    const firstAccessibleRoute = Object.values(ROUTES).find(route => 
      route.permission && user.permissions?.includes(route.permission)
    );
    if (firstAccessibleRoute) {
      return <Navigate to={firstAccessibleRoute.path} />;
    }
  }

  const currentDrawerWidth = isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          ml: { sm: `${currentDrawerWidth}px` },
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ minHeight: TOOLBAR_HEIGHT, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: 'text.primary',
                fontWeight: 500
              }}
            >
              {user.email}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={isDarkMode ? LAYOUT_STRINGS.HEADER.THEME.SWITCH_TO_LIGHT : LAYOUT_STRINGS.HEADER.THEME.SWITCH_TO_DARK}>
              <IconButton
                onClick={handleThemeToggle}
                sx={{
                  borderRadius: 2,
                  p: 1.5,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
            </Tooltip>
            <Button 
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: 2,
                px: 3,
                '&:hover': {
                  bgcolor: alpha(theme.palette.error.main, 0.08),
                  color: 'error.main',
                },
              }}
            >
              {LAYOUT_STRINGS.DRAWER.LOGOUT}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ 
          width: { sm: currentDrawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              width: DRAWER_WIDTH,
              bgcolor: 'background.paper',
              borderRight: 1,
              borderColor: 'divider',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              width: currentDrawerWidth,
              bgcolor: 'background.paper',
              borderRight: 1,
              borderColor: 'divider',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${currentDrawerWidth}px)` },
          minHeight: '100vh',
          pt: `${TOOLBAR_HEIGHT}px`,
        }}
      >
        <Container maxWidth="xl" sx={{ p: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;