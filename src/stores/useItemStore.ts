import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMemo } from "react";

export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  category?: string; // Added category field
  hsn?: string;
  unit?: string;
  igst?: number;
  sgst?: number;
  cgst?: number;
  subcategoryId?: number; // Add subcategoryId for subcategory association
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
            category: item.category || "", // Ensure category is present
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
