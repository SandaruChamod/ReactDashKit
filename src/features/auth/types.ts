export interface User {
  id: string;
  email: string;
  role: string;
  permissions?: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  VENDOR: 'vendor',
} as const;

export const PERMISSIONS = {
  VIEW_USERS: 'view_users',
  VIEW_VENDORS: 'view_vendors',
  MANAGE_USERS: 'manage_users',
  MANAGE_VENDORS: 'manage_vendors',
} as const;