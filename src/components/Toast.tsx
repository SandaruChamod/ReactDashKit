import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../store';
import { hideToast } from '../store/toastSlice';
import { TOAST_TYPES } from '../constants/toast';

const Toast = () => {
  const dispatch = useAppDispatch();
  const { open, message, type } = useAppSelector((state) => state.toast);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(hideToast());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleClose} 
        severity={type} 
        sx={{ 
          width: '100%',
          borderRadius: 2,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;