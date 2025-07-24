import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PurchaseOrderFormValues } from "@/components/purchaseOrder/PurchaseOrderForm";

interface PurchaseOrderStore {
  purchaseOrders: PurchaseOrderFormValues[];
  createPurchaseOrder: (po: PurchaseOrderFormValues) => void;
  updatePurchaseOrder: (
    purchaseOrderNo: string,
    updated: Partial<PurchaseOrderFormValues>
  ) => void;
  removePurchaseOrder: (purchaseOrderNo: string) => void;
  getPurchaseOrders: () => PurchaseOrderFormValues[];
}

export const usePurchaseOrderStore = create<PurchaseOrderStore>()(
  persist(
    (set, get) => ({
      purchaseOrders: [],
      createPurchaseOrder: (po) => {
        set((state) => ({ purchaseOrders: [...state.purchaseOrders, po] }));
      },
      updatePurchaseOrder: (purchaseOrderNo, updated) =>
        set((state) => ({
          purchaseOrders: state.purchaseOrders.map((po) =>
            po.purchaseOrderNo === purchaseOrderNo ? { ...po, ...updated } : po
          ),
        })),
      removePurchaseOrder: (purchaseOrderNo) =>
        set((state) => ({
          purchaseOrders: state.purchaseOrders.filter(
            (po) => po.purchaseOrderNo !== purchaseOrderNo
          ),
        })),
      getPurchaseOrders: () => get().purchaseOrders,
    }),
    {
      name: "purchaseOrder-storage",
      partialize: (state) => ({ purchaseOrders: state.purchaseOrders }),
    }
  )
); 