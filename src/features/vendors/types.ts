export interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface VendorState {
  vendors: Vendor[];
  loading: boolean;
  error: string | null;
}

export interface CreateVendorPayload {
  name: string;
  email: string;
  phone: string;
}

export const VENDOR_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const;