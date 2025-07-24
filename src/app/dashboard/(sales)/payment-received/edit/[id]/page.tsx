"use client";
import React from "react";
import PaymentReceivedForm, { PaymentReceivedFormValues } from "@/components/paymentReceived/PaymentReivedForm";
import { usePaymentReceivedStore } from "@/stores/usePaymentReceivedStore";
import { useRouter, useParams } from "next/navigation";

export default function PaymentReceivedEditPage() {
  const { id } = useParams();
  const getPayment = usePaymentReceivedStore((state) => state.getPayment);
  const updatePayment = usePaymentReceivedStore((state) => state.updatePayment);
  const router = useRouter();

  const payment = getPayment(id as string);

  if (!payment) {
    return <div className="max-w-2xl mx-auto p-8 text-center text-red-500">Payment not found.</div>;
  }

  const handleSubmit = (values: PaymentReceivedFormValues) => {
    updatePayment(payment.id, values);
    router.push("/dashboard/payment-received");
  };

  return (
    <PaymentReceivedForm mode="edit" initialValues={payment} onSubmit={handleSubmit} />
  );
} 