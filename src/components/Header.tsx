import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Breadcrumbs from './Breadcrumbs';

interface HeaderProps {
  title: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  onAddClick?: () => void;
  showAddButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  breadcrumbs, 
  onAddClick, 
  showAddButton = true 
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs items={breadcrumbs} />
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 3
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        {showAddButton && onAddClick && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddClick}
            sx={{ 
              borderRadius: 2,
              px: 3
            }}
          >
            Add New
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;