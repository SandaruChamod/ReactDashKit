import authReducer, {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from '../authSlice';
import { User } from '../../types';

describe('authSlice', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
  };

  const mockUser: User = {
    id: '1',
    email: 'test@example.com',
    role: 'user',
    permissions: ['view_users'],
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle loginRequest', () => {
    const actual = authReducer(initialState, loginRequest({ email: 'test@example.com', password: 'password' }));
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle loginSuccess', () => {
    const actual = authReducer(initialState, loginSuccess(mockUser));
    expect(actual.loading).toBe(false);
    expect(actual.user).toEqual(mockUser);
    expect(actual.error).toBeNull();
  });

  it('should handle loginFailure', () => {
    const error = 'Invalid credentials';
    const actual = authReducer(initialState, loginFailure(error));
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
    expect(actual.user).toBeNull();
  });

  it('should handle logout', () => {
    const stateWithUser = {
      user: mockUser,
      loading: false,
      error: null,
    };
    const actual = authReducer(stateWithUser, logout());
    expect(actual).toEqual(initialState);
  });
});