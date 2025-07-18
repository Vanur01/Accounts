import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InvoiceFormValues } from "@/components/invoice/InvoiceForm";

interface InvoiceStore {
  invoices: InvoiceFormValues[];
  createInvoice: (invoice: InvoiceFormValues) => void;
  updateInvoice: (
    invoiceNumber: string,
    updated: Partial<InvoiceFormValues>
  ) => void;
  removeInvoice: (invoiceNumber: string) => void;
  getInvoices: () => InvoiceFormValues[];
}

export const useInvoiceStore = create<InvoiceStore>()(
  persist(
    (set, get) => ({
      invoices: [],
      createInvoice: (invoice) => {
        set((state) => ({ invoices: [...state.invoices, invoice] }));
        console.log(get().invoices);
      },
      updateInvoice: (invoiceNumber, updated) =>
        set((state) => ({
          invoices: state.invoices.map((inv) =>
            inv.invoiceNumber === invoiceNumber ? { ...inv, ...updated } : inv
          ),
        })),
      removeInvoice: (invoiceNumber) =>
        set((state) => ({
          invoices: state.invoices.filter(
            (inv) => inv.invoiceNumber !== invoiceNumber
          ),
        })),
      getInvoices: () => get().invoices,
    }),
    {
      name: "invoice-storage",
      partialize: (state) => ({ invoices: state.invoices }),
    }
  )
);
