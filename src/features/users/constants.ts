export const USER_ACTIONS = {
  FETCH_USERS: 'users/fetchUsers',
  FETCH_USERS_SUCCESS: 'users/fetchUsersSuccess',
  FETCH_USERS_FAILURE: 'users/fetchUsersFailure',
  CREATE_USER: 'users/createUser',
  CREATE_USER_SUCCESS: 'users/createUserSuccess',
  CREATE_USER_FAILURE: 'users/createUserFailure',
} as const;

export const USER_MESSAGES = {
  LOADING_USERS: 'Loading users...',
  CREATING_USER: 'Creating user...',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export const USER_TABLE_COLUMNS = [
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'role', headerName: 'Role', width: 130 },
  {
    field: 'created_at',
    headerName: 'Created At',
    width: 200,
    valueFormatter: (params: any) => new Date(params.value).toLocaleString(),
  },
] as const;