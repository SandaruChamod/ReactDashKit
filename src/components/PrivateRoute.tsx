import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import { getRouteByPath, getFirstAccessibleRoute } from '../config/routes';
import { useRouteAccess } from '../hooks/useRouteAccess';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { canAccess } = useRouteAccess();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const currentRoute = getRouteByPath(location.pathname);
  if (!currentRoute || !canAccess(currentRoute)) {
    const firstAccessibleRoute = getFirstAccessibleRoute(user.permissions);
    return <Navigate to={firstAccessibleRoute?.path || '/'} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;