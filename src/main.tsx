import React, { Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getTheme } from './theme';
import { store } from './store';
import App from './App';
import './styles/index.scss';

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <CircularProgress />
  </Box>
);

const AppWithTheme = () => {
  const [mounted, setMounted] = React.useState(false);
  const [mode, setMode] = React.useState(store.getState().theme.mode);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newMode = store.getState().theme.mode;
      if (newMode !== mode) {
        setMode(newMode);
      }
    });

    return () => unsubscribe();
  }, [mode]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </ThemeProvider>
  );
};

const router = createBrowserRouter(
  [
    {
      path: '*',
      element: <AppWithTheme />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);