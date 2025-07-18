"use client";

// Copy and adapt from quotation create page
import React, { useState } from "react";
import InvoiceForm, { InvoiceFormValues } from "@/components/invoice/InvoiceForm";
import { useClientStore } from "@/stores/useClientStore";
import { useItemStore } from "@/stores/useItemStore";
import { useInvoiceStore } from "@/stores/useinvoiceStore";
import { useRouter } from "next/navigation"

const generateInvoiceNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `INV-${datePart}-${randomPart}`;
};

const defaultInitialValues: InvoiceFormValues = {
  invoiceTitle: "",
  invoiceNumber: generateInvoiceNumber(),
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
};

export default function CreateInvoicePage() {
  const router = useRouter();
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const [loading, setLoading] = useState(false);
  const createInvoice = useInvoiceStore((state) => state.createInvoice);

  const handleCreate = async (values: InvoiceFormValues) => {
    setLoading(true);
    try {
      await createInvoice(values);
      router.push("/dashboard/quotation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvoiceForm
      initialValues={defaultInitialValues}
      onSubmit={handleCreate}
      mode="create"
      mockClients={clients}
      mockProducts={items}
      loading={loading}
    />
  );
}
