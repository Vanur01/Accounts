"use client";

import React, { useState } from "react";
import QuotationForm, { QuotationFormValues } from "@/components/quotation/QuotationForm";
import { useQuotationStore } from "@/stores/useQuotationStore";
import { useClientStore } from "@/stores/useClientStore";
import { useRouter } from "next/navigation";
import { useItemStore } from "@/stores/useItemStore";
import { useBussinessStore } from "@/stores/useBussinessStore";


const generateQuotationNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `QTN-${datePart}-${randomPart}`;
};

export default function CreateQuotationPage() {
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const createQuotation = useQuotationStore((state) => state.createQuotation);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { details } = useBussinessStore();
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

  // Log for debugging
  console.log("businessStoreDetails", businessStoreDetails);
  console.log("mappedBusinessDetails", mappedBusinessDetails);

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
    businessDetails: mappedBusinessDetails,
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

  const handleCreate = async (values: QuotationFormValues) => {
    setLoading(true);
    try {
      await createQuotation(values);
      router.push("/dashboard/quotations");
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
