import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../../../test-utils';
import Login from '../Login';
import { loginRequest } from '../../store/authSlice';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login', () => {
  it('renders login form', () => {
    renderWithProviders(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.blur(screen.getByLabelText(/email/i));
    
    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('dispatches loginRequest with form values', async () => {
    const { store } = renderWithProviders(<Login />);
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: testEmail } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: testPassword } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      const actions = store.getActions();
      const loginAction = actions.find(action => action.type === loginRequest.type);
      expect(loginAction).toBeTruthy();
      expect(loginAction?.payload).toEqual({
        email: testEmail,
        password: testPassword,
      });
    });
  });

  it('shows error message when login fails', () => {
    const errorMessage = 'Invalid credentials';
    renderWithProviders(<Login />, {
      preloadedState: {
        auth: {
          user: null,
          loading: false,
          error: errorMessage,
        },
        theme: {
          mode: 'light'
        }
      },
    });
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('shows loading state during login', () => {
    renderWithProviders(<Login />, {
      preloadedState: {
        auth: {
          user: null,
          loading: true,
          error: null,
        },
        theme: {
          mode: 'light'
        }
      },
    });
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });
});