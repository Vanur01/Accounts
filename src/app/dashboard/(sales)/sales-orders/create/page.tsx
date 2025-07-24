"use client";

import React, { useState } from "react";
import SalesOrderForm, { SalesOrderFormValues } from "@/components/salesOrder/SalesOrderForm";
import { useClientStore } from "@/stores/useClientStore";
import { useItemStore } from "@/stores/useItemStore";
import { useSalesOrderStore } from "@/stores/useSalesOrderStore";
import { useRouter } from "next/navigation";
import { useBussinessStore } from "@/stores/useBussinessStore";

const generateOrderNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `SO-${datePart}-${randomPart}`;
};

export default function CreateSalesOrderPage() {
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const createSalesOrder = useSalesOrderStore((state) => state.createSalesOrder);
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

  const defaultInitialValues: SalesOrderFormValues = {
    type: "salesOrder",
    orderTitle: "",
    orderNumber: generateOrderNumber(),
    orderDate: new Date().toISOString().slice(0, 10),
    deliveryDate: "",
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
  };

  const handleCreate = async (values: SalesOrderFormValues) => {
    setLoading(true);
    try {
      await createSalesOrder(values);
      router.push("/dashboard/sales-orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SalesOrderForm
      initialValues={defaultInitialValues}
      onSubmit={handleCreate}
      mode="create"
      mockClients={clients}
      mockProducts={items}
      loading={loading}
    />
  );
}
