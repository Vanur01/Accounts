"use client";

// Copy and adapt from quotation create page
import React, { useState } from "react";
import InvoiceForm, { InvoiceFormValues } from "@/components/invoice/InvoiceForm";
import { useClientStore } from "@/stores/useClientStore";
import { useItemStore } from "@/stores/useItemStore";
import { useInvoiceStore } from "@/stores/useinvoiceStore";
import { useBussinessStore } from "@/stores/useBussinessStore";
import { useRouter } from "next/navigation"

const generateInvoiceNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `INV-${datePart}-${randomPart}`;
};

export default function CreateInvoicePage() {
  const router = useRouter();
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const { details } = useBussinessStore();
  const [loading, setLoading] = useState(false);
  const createInvoice = useInvoiceStore((state) => state.createInvoice);

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

const defaultInitialValues: InvoiceFormValues = {
  type: "performa",
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

  const handleCreate = async (values: InvoiceFormValues) => {
    setLoading(true);
    try {
      await createInvoice(values);
      router.push("/dashboard/performa-invoices");
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
