import axios from 'axios';
import { PERMISSIONS, ROLES } from '../features/auth/types';
import { VENDOR_STATUS } from '../features/vendors/types';

// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'admin@gmail.com',
    role: ROLES.ADMIN,
    permissions: [PERMISSIONS.VIEW_USERS, PERMISSIONS.VIEW_VENDORS, PERMISSIONS.MANAGE_USERS, PERMISSIONS.MANAGE_VENDORS],
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'user@gmail.com',
    role: ROLES.USER,
    permissions: [PERMISSIONS.VIEW_USERS],
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    email: 'vendor@gmail.com',
    role: ROLES.VENDOR,
    permissions: [PERMISSIONS.VIEW_VENDORS],
    created_at: '2024-01-03T00:00:00Z',
  },
];

// Mock vendor data
let mockVendors = [
  {
    id: '1',
    name: 'Acme Corporation',
    email: 'contact@acme.com',
    phone: '+1-555-0123',
    status: VENDOR_STATUS.ACTIVE,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Global Supplies Ltd',
    email: 'info@globalsupplies.com',
    phone: '+1-555-0124',
    status: VENDOR_STATUS.ACTIVE,
    created_at: '2024-01-02T00:00:00Z',
  },
];

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockPassword = process.env.MOCK_PASSWORD || 'admin';
      if (password !== mockPassword) {
        throw new Error('Invalid credentials');
      }

      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid credentials');
      }

      return user;
    },
  },
  users: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [...mockUsers];
    },
    create: async (userData: { email: string; role: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: String(mockUsers.length + 1),
        email: userData.email,
        role: userData.role,
        permissions: userData.role === ROLES.ADMIN 
          ? [PERMISSIONS.VIEW_USERS, PERMISSIONS.VIEW_VENDORS, PERMISSIONS.MANAGE_USERS, PERMISSIONS.MANAGE_VENDORS]
          : userData.role === ROLES.USER 
            ? [PERMISSIONS.VIEW_USERS]
            : [PERMISSIONS.VIEW_VENDORS],
        created_at: new Date().toISOString(),
      };
      
      mockUsers.push(newUser);
      return newUser;
    },
  },
  vendors: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [...mockVendors];
    },
    create: async (vendorData: { name: string; email: string; phone: string }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newVendor = {
        id: String(mockVendors.length + 1),
        ...vendorData,
        status: VENDOR_STATUS.ACTIVE,
        created_at: new Date().toISOString(),
      };
      
      mockVendors.push(newVendor);
      return newVendor;
    },
  },
};

export default api;