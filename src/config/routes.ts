import { People as UsersIcon } from '@mui/icons-material';
import { LayoutDashboard as DashboardIcon } from 'lucide-react';
import { PERMISSIONS } from '../features/auth/types';

export interface RouteConfig {
  path: string;
  title: string;
  icon: any;
  breadcrumbs: Array<{ label: string; path?: string }>;
  permission?: string;
  children?: Record<string, Omit<RouteConfig, 'icon' | 'children'>>;
}

export const ROUTES: Record<string, RouteConfig> = {
  dashboard: {
    path: '/',
    title: 'Dashboard',
    icon: DashboardIcon,
    breadcrumbs: [
      { label: 'Dashboard' }
    ],
  },
  users: {
    path: '/users',
    title: 'User Management',
    icon: UsersIcon,
    breadcrumbs: [
      { label: 'Dashboard', path: '/' },
      { label: 'User Management' }
    ],
    permission: PERMISSIONS.VIEW_USERS,
    children: {
      create: {
        path: '/users/create',
        title: 'Create User',
        breadcrumbs: [
          { label: 'Dashboard', path: '/' },
          { label: 'User Management', path: '/users' },
          { label: 'Create User' }
        ],
        permission: PERMISSIONS.MANAGE_USERS
      },
      details: {
        path: '/users/:id',
        title: 'User Details',
        breadcrumbs: [
          { label: 'Dashboard', path: '/' },
          { label: 'User Management', path: '/users' },
          { label: 'User Details' }
        ],
        permission: PERMISSIONS.VIEW_USERS
      },
      edit: {
        path: '/users/:id/edit',
        title: 'Edit User',
        breadcrumbs: [
          { label: 'Dashboard', path: '/' },
          { label: 'User Management', path: '/users' },
          { label: 'Edit User' }
        ],
        permission: PERMISSIONS.MANAGE_USERS
      }
    }
  }
} as const;

// Helper functions
export const getRouteByPath = (path: string): RouteConfig | undefined => {
  // First check main routes
  const mainRoute = Object.values(ROUTES).find(route => route.path === path);
  if (mainRoute) return mainRoute;

  // Then check children routes
  for (const route of Object.values(ROUTES)) {
    if (route.children) {
      const childRoute = Object.values(route.children).find(child => child.path === path);
      if (childRoute) return { ...childRoute, icon: route.icon };
    }
  }

  // Handle dynamic routes
  return Object.values(ROUTES).reduce((found: RouteConfig | undefined, route) => {
    if (found) return found;
    if (route.children) {
      const dynamicChild = Object.values(route.children).find(child => {
        const pattern = new RegExp(
          '^' + child.path.replace(/:[^\s/]+/g, '([^/]+)') + '$'
        );
        return pattern.test(path);
      });
      if (dynamicChild) return { ...dynamicChild, icon: route.icon };
    }
    return undefined;
  }, undefined);
};

export const isRouteAccessible = (route: RouteConfig, permissions?: string[]): boolean => {
  if (!route.permission) return true;
  return permissions?.includes(route.permission) || false;
};

export const getFirstAccessibleRoute = (permissions?: string[]): RouteConfig | undefined => {
  return Object.values(ROUTES).find(route => isRouteAccessible(route, permissions));
};