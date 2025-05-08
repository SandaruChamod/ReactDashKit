export interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  role: string;
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}