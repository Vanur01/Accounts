import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMemo } from "react";
import type { Vendor } from "./useVendorStore";

export type Item = {
  id: number;
  name: string;
  sku?: string;
  description: string;
  type: string;
  category?: string;
  subcategory?: string;
  hsn?: string;
  unit?: string;
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  dimensionUnit?: string;
  image?: File | null;
  igst?: number | string;
  sgst?: number | string;
  cgst?: number | string;
  sellingPrice?: number | string;
  salesDescription?: string;
  costPrice?: number | string;
  purchaseDescription?: string;
  preferredVendor?: string;
};

interface ItemStore {
  items: Item[];
  addItem: (item: Omit<Item, "id">) => void;
  editItem: (id: number, item: Omit<Item, "id">) => void;
}

export const useItemStore = create<ItemStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const newItem = {
            id: state.items.length ? state.items[state.items.length - 1].id + 1 : 1,
            ...item,
            category: item.category || "",
          };
          const updatedItems = [...state.items, newItem];
          console.log('Item added:', newItem);
          return {
            items: updatedItems,
          };
        }),
      editItem: (id, item) => 
        set((state) => {
          const updatedItems = state.items.map((it) =>
            it.id === id ? { ...it, ...item, category: item.category || it.category || "" } : it
          );
          const editedItem = updatedItems.find((it) => it.id === id);
          console.log('Item edited:', editedItem);
          return {
            items: updatedItems,
          };
        }),
    }),
    {
      name: "item-store",
    }
  )
);
