export const VENDOR_MESSAGES = {
  LOADING: {
    VENDORS: 'Loading vendors...',
    VENDOR: 'Loading vendor details...',
  },
  CREATING: {
    VENDOR: 'Creating new vendor...',
  },
  SUCCESS: {
    CREATE: 'Vendor created successfully',
    UPDATE: 'Vendor updated successfully',
    DELETE: 'Vendor deleted successfully',
  },
  ERROR: {
    FETCH: 'Failed to fetch vendors',
    CREATE: 'Failed to create vendor',
    UPDATE: 'Failed to update vendor',
    DELETE: 'Failed to delete vendor',
    UNKNOWN: 'An unknown error occurred',
  },
  VALIDATION: {
    NAME_REQUIRED: 'Name is required',
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Invalid email address',
    PHONE_REQUIRED: 'Phone is required',
    PHONE_INVALID: 'Invalid phone number',
  },
} as const;

export const VENDOR_TABLE_COLUMNS = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 120,
    renderCell: (params: any) => ({
      label: params.value,
      color: params.value === 'active' ? 'success' : 'default',
    }),
  },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    valueFormatter: (params: any) => new Date(params.value).toLocaleString(),
  },
] as const;