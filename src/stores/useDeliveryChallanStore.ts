import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuotationFormValues } from "@/components/quotation/QuotationForm";

export type DeliveryChallanFormValues = QuotationFormValues;

interface DeliveryChallanStore {
  challans: DeliveryChallanFormValues[];
  createChallan: (challan: DeliveryChallanFormValues) => void;
  updateChallan: (
    challanNumber: string,
    updated: Partial<DeliveryChallanFormValues>
  ) => void;
  removeChallan: (challanNumber: string) => void;
  getChallans: () => DeliveryChallanFormValues[];
}

export const useDeliveryChallanStore = create<DeliveryChallanStore>()(
  persist(
    (set, get) => ({
      challans: [],
      createChallan: (challan) => {
        set((state) => ({ challans: [...state.challans, challan] }));
      },
      updateChallan: (challanNumber, updated) =>
        set((state) => ({
          challans: state.challans.map((c) =>
            c.quotationNumber === challanNumber ? { ...c, ...updated } : c
          ),
        })),
      removeChallan: (challanNumber) =>
        set((state) => ({
          challans: state.challans.filter(
            (c) => c.quotationNumber !== challanNumber
          ),
        })),
      getChallans: () => get().challans,
    }),
    {
      name: "delivery-challan-storage",
      partialize: (state) => ({ challans: state.challans }),
    }
  )
); 