"use client";
import React from "react";
import PaymentReceivedForm, { PaymentReceivedFormValues } from "@/components/paymentReceived/PaymentReivedForm";
import { usePaymentReceivedStore } from "@/stores/usePaymentReceivedStore";
import { useRouter } from "next/navigation";

export default function PaymentReceivedCreatePage() {
  const createPayment = usePaymentReceivedStore((state) => state.createPayment);
  const router = useRouter();

  const handleSubmit = (values: PaymentReceivedFormValues) => {
    const id = Date.now().toString();
    createPayment({ ...values, id });
    router.push("/dashboard/payment-received");
  };

  return (
    <PaymentReceivedForm mode="create" onSubmit={handleSubmit} />
  );
}
