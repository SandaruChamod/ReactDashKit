export const AUTH_MESSAGES = {
  SIGNING_IN: 'Signing in...',
  LOGIN_ERROR: 'Invalid email or password',
  UNKNOWN_ERROR: 'An unknown error occurred',
  VALIDATION: {
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Invalid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  },
} as const;