import React from 'react';
import { Box } from '@mui/material';
import Header from '../components/Header';

interface PageWrapperProps {
  title: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  children: React.ReactNode;
  onAddClick?: () => void;
  showAddButton?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  title,
  breadcrumbs,
  children,
  onAddClick,
  showAddButton = true,
}) => {
  return (
    <Box
      sx={{
        height: 'calc(100vh - 116px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header
        title={title}
        breadcrumbs={breadcrumbs}
        onAddClick={onAddClick}
        showAddButton={showAddButton}
      />
      {children}
    </Box>
  );
};

export default PageWrapper;