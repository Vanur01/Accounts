import { create } from "zustand";
import { persist } from "zustand/middleware";
import {PaymentsMadeFormValues} from "@/components/paymentReceived/PaymentReivedForm";

export type PaymentReceived = PaymentsMadeFormValues & { id: string };

interface PaymentReceivedStore {
  payments: PaymentReceived[];
  createPayment: (payment: PaymentReceived) => void;
  updatePayment: (id: string, updated: Partial<PaymentReceived>) => void;
  removePayment: (id: string) => void;
  getPayment: (id: string) => PaymentReceived | undefined;
  getPayments: () => PaymentReceived[];
}

export const usePaymentReceivedStore = create<PaymentReceivedStore>()(
  persist(
    (set, get) => ({
      payments: [],
      createPayment: (payment) => {
        set((state) => ({ payments: [...state.payments, payment] }));
      },
      updatePayment: (id, updated) =>
        set((state) => ({
          payments: state.payments.map((p) =>
            p.id === id ? { ...p, ...updated } : p
          ),
        })),
      removePayment: (id) =>
        set((state) => ({
          payments: state.payments.filter((p) => p.id !== id),
        })),
      getPayment: (id) => get().payments.find((p) => p.id === id),
      getPayments: () => get().payments,
    }),
    {
      name: "payment-received-storage",
      partialize: (state) => ({ payments: state.payments }),
    }
  )
);
