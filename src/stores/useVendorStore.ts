import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Vendor = {
  id: number;
  name: string;
  industry?: string;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  streetAddress?: string;
  gstin?: string;
  panNumber?: string;
  gstType?: string;
  taxTreatment?: string;
  vendorType?: string;
  displayName?: string;
  uniqueKey?: string;
  email?: string;
  showEmail?: boolean;
  contact?: string;
  phone?: string;
  showPhone?: boolean;
  address?: string;
  customFields?: { label: string; value: string }[];
  bankAccounts?: {
    bankName: string;
    accountNumber: string;
    ifsc: string;
    branch?: string;
    accountType?: string;
  }[];
  attachments?: { name: string; url: string }[];
};

interface VendorStore {
  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, "id">) => void;
  editVendor: (id: number, vendor: Omit<Vendor, "id">) => void;
  removeVendor: (id: number) => void;
}

export const useVendorStore = create<VendorStore>()(
  persist(
    (set, get) => ({
      vendors: [],
      addVendor: (vendor) =>
        set((state) => {
          const newVendor = {
            id: state.vendors.length ? state.vendors[state.vendors.length - 1].id + 1 : 1,
            ...vendor,
          };
          return { vendors: [...state.vendors, newVendor] };
        }),
      editVendor: (id, vendor) =>
        set((state) => ({
          vendors: state.vendors.map((v) =>
            v.id === id ? { ...v, ...vendor } : v
          ),
        })),
      removeVendor: (id) =>
        set((state) => ({
          vendors: state.vendors.filter((v) => v.id !== id),
        })),
    }),
    {
      name: "vendor-store",
    }
  )
); 