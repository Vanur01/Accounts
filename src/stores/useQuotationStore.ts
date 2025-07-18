import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuotationFormValues } from "@/components/quotation/QuotationForm";

interface QuotationStore {
  quotations: QuotationFormValues[];
  createQuotation: (quotation: QuotationFormValues) => void;
  updateQuotation: (
    quotationNumber: string,
    updated: Partial<QuotationFormValues>
  ) => void;
  removeQuotation: (quotationNumber: string) => void;
  getQuotations: () => QuotationFormValues[];
}

export const useQuotationStore = create<QuotationStore>()(
  persist(
    (set, get) => ({
      quotations: [],
      createQuotation: (quotation) => {
        set((state) => ({ quotations: [...state.quotations, quotation] }));
        console.log(get().quotations)
      },
      updateQuotation: (quotationNumber, updated) =>
        set((state) => ({
          quotations: state.quotations.map((q) =>
            q.quotationNumber === quotationNumber ? { ...q, ...updated } : q
          ),
        })),
      removeQuotation: (quotationNumber) =>
        set((state) => ({
          quotations: state.quotations.filter(
            (q) => q.quotationNumber !== quotationNumber
          ),
        })),
      getQuotations: () => get().quotations,
    }),
    {
      name: "quotation-storage",
      partialize: (state) => ({ quotations: state.quotations }),
    }
  )
);
