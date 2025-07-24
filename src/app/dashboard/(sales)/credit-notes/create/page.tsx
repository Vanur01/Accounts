"use client";

import React, { useState } from "react";
import CreaditNotesForm, { CreditNoteFormValues, Invoice } from "@/components/creditNotes/CreaditNotesForm";
import { useClientStore } from "@/stores/useClientStore";
import { useItemStore } from "@/stores/useItemStore";
import { useBussinessStore } from "@/stores/useBussinessStore";
import { useCreditNoteStore } from "@/stores/useCreditNoteStore";
import { useRouter } from "next/navigation";

const generateCreditNoteNo = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `A${datePart}${randomPart}`;
};

export default function CreateCreditNotePage() {
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const { details } = useBussinessStore();
  const createCreditNote = useCreditNoteStore((state) => state.createCreditNote);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const businessStoreDetails = details;

  if (!businessStoreDetails) {
    return <div>Loading business details...</div>;
  }

  const mappedBusinessDetails = {
    name: businessStoreDetails.businessName,
    gstin: businessStoreDetails.gstNumber || "",
    address: businessStoreDetails.website || "",
    contact: businessStoreDetails.phone,
    email: "",
  };

  const defaultInitialValues: CreditNoteFormValues = {
    creditNoteNo: generateCreditNoteNo(),
    creditNoteDate: new Date().toISOString().slice(0, 10),
    linkedInvoice: "",
    reason: "",
    clientId: "",
    clientDetails: {
      name: "",
      gstin: "",
      address: "",
      contact: "",
      email: "",
    },
    businessDetails: mappedBusinessDetails,
    items: [
      {
        name: "",
        description: "",
        qty: 1,
        rate: 0,
        discount: 0,
        amount: 0,
        hsn: "",
        unit: "pcs",
      },
    ],
    discountType: "flat",
    discountValue: 0,
    shipping: 0,
    roundOff: false,
    showHSN: false,
    showUnit: false,
    terms: "",
    notes: "",
    attachments: [],
    showSignature: false,
  };

  // TODO: Replace with real invoices and reasons
  const invoices: Invoice[] = [];
  const reasons: string[] = [];

  const handleCreate = async (values: CreditNoteFormValues) => {
    setLoading(true);
    try {
      await createCreditNote(values);
      router.push("/dashboard/credit-notes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CreaditNotesForm
      initialValues={defaultInitialValues}
      onSubmit={handleCreate}
      mode="create"
      mockClients={clients}
      mockProducts={items}
      invoices={invoices}
      reasons={reasons}
      loading={loading}
    />
  );
} 