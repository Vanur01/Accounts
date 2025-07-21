import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SalesOrderFormValues } from "@/components/salesOrder/SalesOrderForm";

interface SalesOrderStore {
  salesOrders: SalesOrderFormValues[];
  createSalesOrder: (order: SalesOrderFormValues) => void;
  updateSalesOrder: (
    orderNumber: string,
    updated: Partial<SalesOrderFormValues>
  ) => void;
  removeSalesOrder: (orderNumber: string) => void;
  getSalesOrders: () => SalesOrderFormValues[];
}

export const useSalesOrderStore = create<SalesOrderStore>()(
  persist(
    (set, get) => ({
      salesOrders: [],
      createSalesOrder: (order) => {
        set((state) => ({ salesOrders: [...state.salesOrders, order] }));
        console.log(get().salesOrders);
      },
      updateSalesOrder: (orderNumber, updated) =>
        set((state) => ({
          salesOrders: state.salesOrders.map((order) =>
            order.orderNumber === orderNumber ? { ...order, ...updated } : order
          ),
        })),
      removeSalesOrder: (orderNumber) =>
        set((state) => ({
          salesOrders: state.salesOrders.filter(
            (order) => order.orderNumber !== orderNumber
          ),
        })),
      getSalesOrders: () => get().salesOrders,
    }),
    {
      name: "sales-order-storage",
      partialize: (state) => ({ salesOrders: state.salesOrders }),
    }
  )
);
