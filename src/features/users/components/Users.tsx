import React, { useEffect } from 'react';
import {
  TextField,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchUsers, createUser } from '../store/userSlice';
import Table from '../../../components/Table';
import Dialog from '../../../components/Dialog';
import PageWrapper from '../../../layouts/PageWrapper';
import { USER_MESSAGES } from '../messages';
import { USER_TABLE_COLUMNS, USER_ROLES } from '../constants';
import { ROUTES } from '../../../config/routes';

const validationSchema = Yup.object({
  email: Yup.string()
    .email(USER_MESSAGES.VALIDATION.EMAIL_INVALID)
    .required(USER_MESSAGES.VALIDATION.EMAIL_REQUIRED),
  password: Yup.string()
    .min(6, USER_MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH)
    .required(USER_MESSAGES.VALIDATION.PASSWORD_REQUIRED),
  role: Yup.string()
    .required(USER_MESSAGES.VALIDATION.ROLE_REQUIRED),
});

const Users = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <PageWrapper
      title={ROUTES.users.title}
      breadcrumbs={ROUTES.users.breadcrumbs}
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
          rows={users}
          columns={USER_TABLE_COLUMNS}
          loading={loading}
          error={error}
          title="Users List"
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
        initialValues={{ email: '', password: '', role: USER_ROLES.USER }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(createUser(values));
          resetForm();
          setOpen(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            title="Add New User"
            loading={loading}
            submitLabel="Add User"
            onSubmit={() => handleSubmit()}
          >
            <Form>
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
                id="password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
                id="role"
                name="role"
                label="Role"
                value={values.role}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.role && Boolean(errors.role)}
                helperText={touched.role && errors.role}
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

export default Users;