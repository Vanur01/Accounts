import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Category = {
  id: number;
  name: string;
  description?: string;
};

interface CategoryStore {
  categories: Category[];
  addCategory: (name: string, description?: string) => void;
  editCategory: (id: number, name: string, description?: string) => void;
  deleteCategory: (id: number) => void;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set, get) => ({
      categories: [],
      addCategory: (name, description) =>
        set((state) => {
          // Prevent duplicates (case-insensitive)
          if (state.categories.some((cat) => cat.name.toLowerCase() === name.toLowerCase())) {
            return {};
          }
          const newCategory = {
            id: state.categories.length ? state.categories[state.categories.length - 1].id + 1 : 1,
            name,
            description,
          };
          return { categories: [...state.categories, newCategory] };
        }),
      editCategory: (id, name, description) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === id ? { ...cat, name, description } : cat
          ),
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
        })),
    }),
    { name: "category-store" }
  )
); 