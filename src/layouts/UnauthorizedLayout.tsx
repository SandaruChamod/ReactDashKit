import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';

const UnauthorizedLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          mt: 8,
          mb: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default UnauthorizedLayout;