import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
  GridToolbarProps,
} from '@mui/x-data-grid';

interface TableProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  loading?: boolean;
  error?: string | null;
  title?: string;
  height?: string | number;
  enableToolbar?: boolean;
  toolbarProps?: Partial<GridToolbarProps>;
  disableRowSelectionOnClick?: boolean;
}

const Table: React.FC<TableProps> = ({
  rows,
  columns,
  loading = false,
  error = null,
  title,
  height = '100%',
  enableToolbar = true,
  toolbarProps,
  disableRowSelectionOnClick = true,
}) => {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: 2,
    }}>
      {title && (
        <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ 
        flex: 1,
        minHeight: 0,
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          slots={{
            loadingOverlay: LinearProgress,
            toolbar: enableToolbar ? GridToolbar : undefined,
          }}
          slotProps={{
            toolbar: {
              ...toolbarProps,
              sx: { 
                p: 2,
                '& .MuiButton-root': {
                  borderRadius: 1.5,
                },
                '& .MuiFormControl-root': {
                  borderRadius: 1.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                  }
                },
                ...toolbarProps?.sx
              }
            }
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          sx={{
            height: '100%',
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row:hover': {
              bgcolor: 'action.hover',
            },
            '& .MuiDataGrid-columnHeaders': {
              bgcolor: 'background.default',
              borderBottom: 1,
              borderColor: 'divider',
            },
            '& .MuiDataGrid-cell': {
              borderColor: 'divider',
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 1,
              borderColor: 'divider',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Table;