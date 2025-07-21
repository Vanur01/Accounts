"use client";

import React, { useState } from "react";
import InvoiceForm, { InvoiceFormValues } from "@/components/invoice/InvoiceForm";
import { useInvoiceStore } from "@/stores/useinvoiceStore";
import { useParams, useRouter } from "next/navigation";
import { useClientStore } from "@/stores/useClientStore";
import { useItemStore } from "@/stores/useItemStore";
import { useBussinessStore } from "@/stores/useBussinessStore";

export default function EditInvoicePage() {
  const params = useParams();
  const router = useRouter();
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const { invoices, updateInvoice } = useInvoiceStore();
  const [loading, setLoading] = useState(false);
  const { details: businessStoreDetails } = useBussinessStore();

  // Get invoice number from URL (id param)
  const invoiceNumber = Array.isArray(params.id) ? params.id[0] : params.id;
  const invoice = invoices.find(inv => inv.invoiceNumber === invoiceNumber);

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

  const initialValues = invoice
    ? {
        ...invoice,
        businessDetails: invoice.businessDetails || mappedBusinessDetails,
      }
    : undefined;

  console.log(initialValues)

  if (!initialValues) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const handleUpdate = async (values: InvoiceFormValues) => {
    setLoading(true);
    try {
      await updateInvoice(values.invoiceNumber, values);
      router.push("/dashboard/invoices");
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvoiceForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      mode="edit"
      mockClients={clients}
      mockProducts={items}
      loading={loading}
    />
  );
}
