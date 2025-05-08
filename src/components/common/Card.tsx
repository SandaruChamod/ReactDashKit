import React from 'react';
import { Card as MuiCard, CardContent, Typography, Box, SxProps, Theme } from '@mui/material';

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  sx?: SxProps<Theme>;
}

const Card: React.FC<CardProps> = ({ title, value, icon, trend, sx }) => {
  return (
    <MuiCard 
      elevation={0}
      sx={{ 
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        ...sx
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon && (
            <Box 
              sx={{ 
                mr: 2,
                p: 1,
                borderRadius: 1,
                bgcolor: 'primary.light',
                color: 'primary.main',
                display: 'flex',
              }}
            >
              {icon}
            </Box>
          )}
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 600 }}>
          {value}
        </Typography>
        {trend && (
          <Typography 
            variant="body2"
            color={trend.isPositive ? 'success.main' : 'error.main'}
          >
            {trend.isPositive ? '+' : ''}{trend.value}% from last month
          </Typography>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default Card;