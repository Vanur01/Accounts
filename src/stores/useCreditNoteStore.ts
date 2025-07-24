import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CreditNoteFormValues } from "@/components/creditNotes/CreaditNotesForm";

interface CreditNoteStore {
  creditNotes: CreditNoteFormValues[];
  createCreditNote: (creditNote: CreditNoteFormValues) => void;
  updateCreditNote: (
    creditNoteNo: string,
    updated: Partial<CreditNoteFormValues>
  ) => void;
  removeCreditNote: (creditNoteNo: string) => void;
  getCreditNotes: () => CreditNoteFormValues[];
}

export const useCreditNoteStore = create<CreditNoteStore>()(
  persist(
    (set, get) => ({
      creditNotes: [],
      createCreditNote: (creditNote) => {
        set((state) => ({ creditNotes: [...state.creditNotes, creditNote] }));
      },
      updateCreditNote: (creditNoteNo, updated) =>
        set((state) => ({
          creditNotes: state.creditNotes.map((c) =>
            c.creditNoteNo === creditNoteNo ? { ...c, ...updated } : c
          ),
        })),
      removeCreditNote: (creditNoteNo) =>
        set((state) => ({
          creditNotes: state.creditNotes.filter(
            (c) => c.creditNoteNo !== creditNoteNo
          ),
        })),
      getCreditNotes: () => get().creditNotes,
    }),
    {
      name: "credit-note-storage",
      partialize: (state) => ({ creditNotes: state.creditNotes }),
    }
  )
);
