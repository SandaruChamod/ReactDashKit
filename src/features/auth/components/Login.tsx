import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Container,
  alpha,
  IconButton,
  useTheme,
  Tooltip,
  Alert,
} from '@mui/material';
import { LogIn } from 'lucide-react';
import { Sun, Moon } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { loginRequest } from '../store/authSlice';
import { toggleTheme } from '../../../store/themeSlice';
import { AUTH_MESSAGES } from '../messages';
import LoadingButton from '../../../components/LoadingButton';

const validationSchema = Yup.object({
  email: Yup.string()
    .email(AUTH_MESSAGES.VALIDATION.EMAIL_INVALID)
    .required(AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED),
  password: Yup.string()
    .required(AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginRequest(values));
    },
  });

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
          <IconButton
            onClick={handleThemeToggle}
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              borderRadius: 2,
              p: 1.5,
              color: 'text.primary',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>
        </Tooltip>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: '100%',
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              color: 'primary.main',
              mb: 2,
              borderRadius: 2,
            }}
          >
            <LogIn size={32} />
          </Box>
          
          <Typography 
            component="h1" 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              mb: 3,
            }}
          >
            Welcome Back
          </Typography>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                width: '100%', 
                mb: 2,
                borderRadius: 2,
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={formik.handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              margin="normal"
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'background.default',
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              sx={{
                '& .MuiInputBase-root': {
                  bgcolor: 'background.default',
                  borderRadius: 2,
                },
              }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              sx={{ 
                mt: 3,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 2,
              }}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;