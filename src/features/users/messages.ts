export const USER_MESSAGES = {
  LOADING: {
    USERS: 'Loading users...',
    USER: 'Loading user details...',
  },
  CREATING: {
    USER: 'Creating new user...',
  },
  SUCCESS: {
    CREATE: 'User created successfully',
    UPDATE: 'User updated successfully',
    DELETE: 'User deleted successfully',
  },
  ERROR: {
    FETCH: 'Failed to fetch users',
    CREATE: 'Failed to create user',
    UPDATE: 'Failed to update user',
    DELETE: 'Failed to delete user',
    UNKNOWN: 'An unknown error occurred',
  },
  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Invalid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
    ROLE_REQUIRED: 'Role is required',
  },
} as const;