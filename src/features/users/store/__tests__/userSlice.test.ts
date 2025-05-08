import userReducer, {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUser,
  createUserSuccess,
  createUserFailure,
} from '../userSlice';
import { User } from '../../types';

describe('userSlice', () => {
  const initialState = {
    users: [],
    loading: false,
    error: null,
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    role: 'user',
    created_at: '2024-01-01T00:00:00Z',
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchUsers', () => {
    const actual = userReducer(initialState, fetchUsers());
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchUsersSuccess', () => {
    const users = [mockUser];
    const actual = userReducer(initialState, fetchUsersSuccess(users));
    expect(actual.loading).toBe(false);
    expect(actual.users).toEqual(users);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchUsersFailure', () => {
    const error = 'Failed to fetch users';
    const actual = userReducer(initialState, fetchUsersFailure(error));
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle createUser', () => {
    const actual = userReducer(initialState, createUser({ email: 'test@example.com', password: 'password', role: 'user' }));
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle createUserSuccess', () => {
    const actual = userReducer(initialState, createUserSuccess(mockUser));
    expect(actual.loading).toBe(false);
    expect(actual.users).toEqual([mockUser]);
    expect(actual.error).toBeNull();
  });

  it('should handle createUserFailure', () => {
    const error = 'Failed to create user';
    const actual = userReducer(initialState, createUserFailure(error));
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });
});