import React from 'react';
import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';
import LoadingButton from './LoadingButton';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onSubmit?: () => void;
  showActions?: boolean;
  fullWidth?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
  loading = false,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onSubmit,
  showActions = true,
  fullWidth = true,
}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: (theme) => theme.shadows[3],
        },
      }}
    >
      <DialogTitle sx={{ px: 3, py: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              },
            }}
          >
            <CloseIcon size={20} />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ px: 3, py: 2 }}>
        {children}
      </DialogContent>

      {showActions && (
        <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
          <Button 
            onClick={onClose} 
            disabled={loading}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
            }}
          >
            {cancelLabel}
          </Button>
          {onSubmit && (
            <LoadingButton
              variant="contained"
              onClick={onSubmit}
              loading={loading}
              sx={{ 
                borderRadius: 2,
                px: 3,
                textTransform: 'none',
              }}
            >
              {submitLabel}
            </LoadingButton>
          )}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

export default Dialog;