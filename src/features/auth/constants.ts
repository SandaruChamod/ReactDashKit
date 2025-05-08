export const AUTH_ACTIONS = {
  LOGIN_REQUEST: 'auth/loginRequest',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILURE: 'auth/loginFailure',
  LOGOUT: 'auth/logout',
} as const;

export const AUTH_MESSAGES = {
  SIGNING_IN: 'Signing in...',
  LOGIN_ERROR: 'Invalid credentials',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

export const AUTH_VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MIN_MESSAGE: 'Password must be at least 6 characters',
} as const;