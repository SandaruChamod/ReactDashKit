import { useAppSelector } from '../store';
import { RouteConfig, isRouteAccessible } from '../config/routes';

export const useRouteAccess = () => {
  const { user } = useAppSelector((state) => state.auth);

  const canAccess = (route: RouteConfig): boolean => {
    if (!user) return false;
    if (user.role === 'admin') return true;
    return isRouteAccessible(route, user.permissions);
  };

  return { canAccess };
};