import React from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from './store';
import AppRoutes from './routes';
import Loader from './components/Loader';
import Toast from './components/Toast';

function App() {
  const { loading, message } = useAppSelector((state) => state.loader);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {loading && <Loader message={message} />}
      <Toast />
      <AppRoutes />
    </Box>
  );
}

export default App;