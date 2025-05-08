import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VendorState, Vendor, CreateVendorPayload } from '../types';

const initialState: VendorState = {
  vendors: [],
  loading: false,
  error: null,
};

export const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    fetchVendors: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchVendorsSuccess: (state, action: PayloadAction<Vendor[]>) => {
      state.loading = false;
      state.vendors = action.payload;
    },
    fetchVendorsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createVendor: (state, action: PayloadAction<CreateVendorPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createVendorSuccess: (state, action: PayloadAction<Vendor>) => {
      state.loading = false;
      state.vendors.push(action.payload);
    },
    createVendorFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchVendors,
  fetchVendorsSuccess,
  fetchVendorsFailure,
  createVendor,
  createVendorSuccess,
  createVendorFailure,
} = vendorSlice.actions;

export default vendorSlice.reducer;