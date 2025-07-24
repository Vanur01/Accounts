"use client";

import React, { useState } from "react";
import CreaditNotesForm, { CreditNoteFormValues, Invoice } from "@/components/creditNotes/CreaditNotesForm";
import { useCreditNoteStore } from "@/stores/useCreditNoteStore";
import { useParams, useRouter } from "next/navigation";
import { useClientStore } from "@/stores/useClientStore";
import { useItemStore } from "@/stores/useItemStore";
import { useBussinessStore } from "@/stores/useBussinessStore";

export default function EditCreditNotePage() {
  const params = useParams();
  const router = useRouter();
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const { creditNotes, updateCreditNote } = useCreditNoteStore();
  const [loading, setLoading] = useState(false);
  const { details: businessStoreDetails } = useBussinessStore();

  // Get credit note number from URL (id param)
  const creditNoteNo = Array.isArray(params.id) ? params.id[0] : params.id;
  const creditNote = creditNotes.find(note => note.creditNoteNo === creditNoteNo);

  const mappedBusinessDetails = businessStoreDetails
    ? {
        name: businessStoreDetails.businessName,
        gstin: businessStoreDetails.gstNumber || "",
        address: businessStoreDetails.website || "",
        contact: businessStoreDetails.phone,
        email: "",
      }
    : {
        name: "",
        gstin: "",
        address: "",
        contact: "",
        email: "",
      };

  const initialValues: CreditNoteFormValues | undefined = creditNote
    ? {
        ...creditNote,
        businessDetails: creditNote.businessDetails || mappedBusinessDetails,
      }
    : undefined;

  // TODO: Replace with real invoices and reasons
  const invoices: Invoice[] = [];
  const reasons: string[] = [];

  if (!initialValues) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const handleUpdate = async (values: CreditNoteFormValues) => {
    setLoading(true);
    try {
      await updateCreditNote(values.creditNoteNo, values);
      router.push("/dashboard/credit-notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreaditNotesForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      mode="edit"
      mockClients={clients}
      mockProducts={items}
      invoices={invoices}
      reasons={reasons}
      loading={loading}
    />
  );
}
