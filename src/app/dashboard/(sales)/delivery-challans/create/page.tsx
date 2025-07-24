"use client";

import React, { useState } from "react";
import DeliveryChallanForm from "@/components/deliveryChallans/DeliveryChallanForm";
import { useDeliveryChallanStore, DeliveryChallanFormValues } from "@/stores/useDeliveryChallanStore";
import { useClientStore } from "@/stores/useClientStore";
import { useItemStore } from "@/stores/useItemStore";
import { useBussinessStore } from "@/stores/useBussinessStore";
import { useRouter } from "next/navigation";

const generateChallanNumber = () => {
  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  return `DC-${datePart}-${randomPart}`;
};

export default function CreateDeliveryChallanPage() {
  const { clients } = useClientStore();
  const { items } = useItemStore();
  const { details } = useBussinessStore();
  const createChallan = useDeliveryChallanStore((state) => state.createChallan);
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

  const defaultInitialValues: DeliveryChallanFormValues = {
    quotationTitle: "",
    quotationNumber: generateChallanNumber(),
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

  const handleCreate = async (values: DeliveryChallanFormValues) => {
    setLoading(true);
    try {
      await createChallan(values);
      router.push("/dashboard/delivery-challans");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeliveryChallanForm
      initialValues={defaultInitialValues}
      onSubmit={handleCreate}
      mode="create"
      mockClients={clients}
      mockProducts={items}
      loading={loading}
    />
  );
}
