export const LAYOUT_STRINGS = {
  DRAWER: {
    ADMIN_PORTAL: 'Admin Portal',
    MENU_ITEMS: {
      USERS: 'Users',
      VENDORS: 'Vendors',
    },
    LOGOUT: 'Logout',
  },
  HEADER: {
    THEME: {
      SWITCH_TO_LIGHT: 'Switch to light mode',
      SWITCH_TO_DARK: 'Switch to dark mode',
    },
  },
  DIMENSIONS: {
    DRAWER_WIDTH: 180,
    COLLAPSED_DRAWER_WIDTH: 64,
    TOOLBAR_HEIGHT: 80,
  },
} as const;

export const LAYOUT_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  VENDORS: '/vendors',
} as const;

export const ROUTE_TITLES: Record<string, string> = {
  '/': 'User Management',
  '/vendors': 'Vendor Management',
  '/vendors/create': 'Create Vendor',
  '/vendors/:id': 'Vendor Details',
  '/vendors/:id/edit': 'Edit Vendor',
  '/users': 'User Management',
  '/users/create': 'Create User',
  '/users/:id': 'User Details',
  '/users/:id/edit': 'Edit User',
} as const;