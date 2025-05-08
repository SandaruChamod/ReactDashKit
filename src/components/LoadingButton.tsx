import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  children, 
  loading = false, 
  disabled,
  ...props 
}) => {
  return (
    <Button
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
      ) : null}
      {children}
    </Button>
  );
};

export default LoadingButton;