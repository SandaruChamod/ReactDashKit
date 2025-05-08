import React, { lazy, Suspense } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useAppSelector } from './store';
import { ROUTES } from './config/routes';

const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const UnauthorizedLayout = lazy(() => import('./layouts/UnauthorizedLayout'));
const Dashboard = lazy(() => import('./features/dashboard/Dashboard'));
const Users = lazy(() => import('./features/users/components/Users'));
const Login = lazy(() => import('./features/auth/components/Login'));

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress />
  </Box>
);

const PrivateRoute = ({ children, permission }: { children: React.ReactNode, permission?: string }) => {
  const { user } = useAppSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Admin has access to everything
  if (user.role === 'admin') {
    return <>{children}</>;
  }

  // Check if user has the required permission
  if (permission && !user.permissions?.includes(permission)) {
    // Find the first route the user has access to
    const firstAccessibleRoute = Object.values(ROUTES).find(route => 
      user.permissions?.includes(route.permission || '')
    );
    return <Navigate to={firstAccessibleRoute?.path || '/'} />;
  }

  return <>{children}</>;
};

export default function AppRoutes() {
  return useRoutes([
    {
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <DashboardLayout />
        </Suspense>
      ),
      children: [
        {
          path: ROUTES.dashboard.path,
          element: <Dashboard />,
        },
        {
          path: ROUTES.users.path,
          element: (
            <PrivateRoute permission={ROUTES.users.permission}>
              <Users />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      element: (
        <Suspense fallback={<LoadingFallback />}>
          <UnauthorizedLayout />
        </Suspense>
      ),
      children: [
        { path: '/login', element: <Login /> },
        { path: '*', element: <Navigate to="/login" /> },
      ],
    },
  ]);
}