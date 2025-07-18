"use client";

import React, { useState } from "react";
import QuotationForm, { QuotationFormValues } from "@/components/quotation/QuotationForm";
import { useQuotationStore } from "@/stores/useQuotationStore";
import { useClientStore } from "@/stores/useClientStore";
import { useRouter } from "next/navigation";
import { useItemStore } from "@/stores/useItemStore";


const generateQuotationNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `QTN-${datePart}-${randomPart}`;
};

const defaultInitialValues: QuotationFormValues = {
  quotationTitle: "",
  quotationNumber: generateQuotationNumber(), // Auto-generate
  date: new Date().toISOString().slice(0, 10),
  dueDate: "",
  clientId: "",
  clientDetails: {
    name: "",
    gstin: "",
    address: "",
    contact: "",
    email: "",
  },
  taxType: "IGST",
  cessList: [],
  items: [
    {
      name: "",
      description: "",
      qty: 1,
      rate: 0,
      discount: 0,
      igst: 0,
      sgst: 0,
      cgst: 0,
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
  phases: [],
};

export default function CreateQuotationPage() {
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const createQuotation = useQuotationStore((state) => state.createQuotation);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (values: QuotationFormValues) => {
    setLoading(true);
    try {
      await createQuotation(values);
      router.push("/dashboard/quotation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuotationForm
      initialValues={defaultInitialValues}
      onSubmit={handleCreate}
      mode="create"
      mockClients={clients}
      mockProducts={items}
      loading={loading}
    />
  );
}
