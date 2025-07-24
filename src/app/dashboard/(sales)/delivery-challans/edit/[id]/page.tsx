"use client";

import React, { useState } from "react";
import DeliveryChallanForm from "@/components/deliveryChallans/DeliveryChallanForm";
import { useDeliveryChallanStore, DeliveryChallanFormValues } from "@/stores/useDeliveryChallanStore";
import { useParams, useRouter } from "next/navigation";
import { useClientStore } from "@/stores/useClientStore";

export default function EditDeliveryChallanPage() {
  const params = useParams();
  const router = useRouter();
  const { clients } = useClientStore();
  const { challans, updateChallan } = useDeliveryChallanStore();
  const [loading, setLoading] = useState(false);

  // Get challan number from URL (id param)
  const challanNumber = Array.isArray(params.id) ? params.id[0] : params.id;
  const initialValues = challans.find(c => c.quotationNumber === challanNumber);

  if (!initialValues) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const handleUpdate = async (values: DeliveryChallanFormValues) => {
    setLoading(true);
    try {
      await updateChallan(values.quotationNumber, values);
      router.push("/dashboard/delivery-challans");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DeliveryChallanForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      mode="edit"
      loading={loading}
    />
  );
}
