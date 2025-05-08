import vendorReducer, {
  fetchVendors,
  fetchVendorsSuccess,
  fetchVendorsFailure,
  createVendor,
  createVendorSuccess,
  createVendorFailure,
} from '../vendorSlice';
import { Vendor } from '../../types';

describe('vendorSlice', () => {
  const initialState = {
    vendors: [],
    loading: false,
    error: null,
  };

  const mockVendor: Vendor = {
    id: '1',
    name: 'Test Vendor',
    email: 'vendor@example.com',
    phone: '123-456-7890',
    status: 'active',
    created_at: '2024-01-01T00:00:00Z',
  };

  it('should handle initial state', () => {
    expect(vendorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchVendors', () => {
    const actual = vendorReducer(initialState, fetchVendors());
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchVendorsSuccess', () => {
    const vendors = [mockVendor];
    const actual = vendorReducer(initialState, fetchVendorsSuccess(vendors));
    expect(actual.loading).toBe(false);
    expect(actual.vendors).toEqual(vendors);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchVendorsFailure', () => {
    const error = 'Failed to fetch vendors';
    const actual = vendorReducer(initialState, fetchVendorsFailure(error));
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });

  it('should handle createVendor', () => {
    const actual = vendorReducer(initialState, createVendor({ name: 'Test Vendor', email: 'vendor@example.com', phone: '123-456-7890' }));
    expect(actual.loading).toBe(true);
    expect(actual.error).toBeNull();
  });

  it('should handle createVendorSuccess', () => {
    const actual = vendorReducer(initialState, createVendorSuccess(mockVendor));
    expect(actual.loading).toBe(false);
    expect(actual.vendors).toEqual([mockVendor]);
    expect(actual.error).toBeNull();
  });

  it('should handle createVendorFailure', () => {
    const error = 'Failed to create vendor';
    const actual = vendorReducer(initialState, createVendorFailure(error));
    expect(actual.loading).toBe(false);
    expect(actual.error).toBe(error);
  });
});