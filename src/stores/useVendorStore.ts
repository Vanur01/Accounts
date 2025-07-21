import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Vendor = {
  id: number;
  name: string;
  gstin?: string;
  contact?: string;
  email?: string;
  address?: string;
};

interface VendorStore {
  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, "id">) => void;
  editVendor: (id: number, vendor: Omit<Vendor, "id">) => void;
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
    }),
    {
      name: "vendor-store",
    }
  )
); 