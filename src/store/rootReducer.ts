import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import userReducer from '../features/users/store/userSlice';
import vendorReducer from '../features/vendors/store/vendorSlice';
import loaderReducer from './loaderSlice';
import toastReducer from './toastSlice';
import themeReducer from './themeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  vendors: vendorReducer,
  loader: loaderReducer,
  toast: toastReducer,
  theme: themeReducer,
});

export default rootReducer;