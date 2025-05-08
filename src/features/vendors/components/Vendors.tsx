import React, { useEffect } from 'react';
import {
  TextField,
  Paper,
  InputAdornment,
  Chip,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchVendors, createVendor } from '../store/vendorSlice';
import Table from '../../../components/Table';
import Dialog from '../../../components/Dialog';
import PageWrapper from '../../../layouts/PageWrapper';
import { VENDOR_MESSAGES, VENDOR_TABLE_COLUMNS } from '../constants';
import { ROUTES } from '../../../config/routes';

const validationSchema = Yup.object({
  name: Yup.string()
    .required(VENDOR_MESSAGES.VALIDATION.NAME_REQUIRED),
  email: Yup.string()
    .email(VENDOR_MESSAGES.VALIDATION.EMAIL_INVALID)
    .required(VENDOR_MESSAGES.VALIDATION.EMAIL_REQUIRED),
  phone: Yup.string()
    .required(VENDOR_MESSAGES.VALIDATION.PHONE_REQUIRED),
});

const Vendors = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { vendors, loading, error } = useAppSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const columns = [
    ...VENDOR_TABLE_COLUMNS.slice(0, 3),
    {
      ...VENDOR_TABLE_COLUMNS[3],
      renderCell: (params: any) => {
        const { label, color } = VENDOR_TABLE_COLUMNS[3].renderCell(params);
        return (
          <Chip 
            label={label} 
            color={color}
            size="small"
          />
        );
      },
    },
    VENDOR_TABLE_COLUMNS[4],
  ];

  return (
    <PageWrapper
      title={ROUTES.vendors.title}
      breadcrumbs={ROUTES.vendors.breadcrumbs}
      onAddClick={() => setOpen(true)}
    >
      <Paper 
        elevation={0}
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        <Table
          rows={vendors}
          columns={columns}
          loading={loading}
          error={error}
          title="Vendors List"
          height="100%"
          enableToolbar
          toolbarProps={{
            showQuickFilter: true,
            quickFilterProps: { 
              debounceMs: 500,
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} />
                  </InputAdornment>
                ),
              },
              sx: { 
                '& .MuiInputBase-root': {
                  bgcolor: 'background.default',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: 'background.default',
                  },
                }
              }
            },
          }}
        />
      </Paper>

      <Formik
        initialValues={{ name: '', email: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(createVendor(values));
          resetForm();
          setOpen(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            title="Add New Vendor"
            loading={loading}
            submitLabel="Add Vendor"
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    bgcolor: 'background.default',
                    borderRadius: 2,
                  }
                }}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    bgcolor: 'background.default',
                    borderRadius: 2,
                  }
                }}
              />
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                margin="normal"
                sx={{
                  '& .MuiInputBase-root': {
                    bgcolor: 'background.default',
                    borderRadius: 2,
                  }
                }}
              />
            </Form>
          </Dialog>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default Vendors;