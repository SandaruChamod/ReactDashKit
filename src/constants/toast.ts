export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

export const TOAST_MESSAGES = {
  SUCCESS: {
    CREATE: 'Created successfully',
    UPDATE: 'Updated successfully',
    DELETE: 'Deleted successfully',
    SAVE: 'Saved successfully',
  },
  ERROR: {
    CREATE: 'Failed to create',
    UPDATE: 'Failed to update',
    DELETE: 'Failed to delete',
    SAVE: 'Failed to save',
    UNKNOWN: 'An unknown error occurred',
  },
  WARNING: {
    UNSAVED_CHANGES: 'You have unsaved changes',
    REQUIRED_FIELDS: 'Please fill in all required fields',
  },
  INFO: {
    LOADING: 'Loading...',
    PROCESSING: 'Processing...',
  },
} as const;

export type ToastType = keyof typeof TOAST_TYPES;