import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Subcategory = {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
};

interface SubcategoryStore {
  subcategories: Subcategory[];
  addSubcategory: (name: string, description: string, categoryId: number) => void;
  editSubcategory: (id: number, name: string, description: string) => void;
  deleteSubcategory: (id: number) => void;
}

export const useSubcategoryStore = create<SubcategoryStore>()(
  persist(
    (set, get) => ({
      subcategories: [],
      addSubcategory: (name, description, categoryId) =>
        set((state) => {
          const newSubcategory = {
            id: state.subcategories.length ? state.subcategories[state.subcategories.length - 1].id + 1 : 1,
            name,
            description,
            categoryId,
          };
          return { subcategories: [...state.subcategories, newSubcategory] };
        }),
      editSubcategory: (id, name, description) =>
        set((state) => ({
          subcategories: state.subcategories.map((sub) =>
            sub.id === id ? { ...sub, name, description } : sub
          ),
        })),
      deleteSubcategory: (id) =>
        set((state) => ({
          subcategories: state.subcategories.filter((sub) => sub.id !== id),
        })),
    }),
    { name: "subcategory-store" }
  )
); 