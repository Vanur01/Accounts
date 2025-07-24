"use client";
import React, { useState } from "react";
import { useVendorStore } from "@/stores/useVendorStore";
import { useRouter } from "next/navigation";
import VendorForm, { VendorFormValues } from "@/components/vendor/VendorForm";

export default function CreateVendorPage() {
  const addVendor = useVendorStore((state) => state.addVendor);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const initialValues: VendorFormValues = {
    name: "",
    industry: "",
    country: "India",
    state: "",
    city: "",
    postalCode: "",
    streetAddress: "",
    gstin: "",
    panNumber: "",
    gstType: "",
    taxTreatment: "",
    vendorType: "Individual",
    displayName: "",
    uniqueKey: Date.now().toString(),
    email: "",
    showEmail: false,
    contact: "",
    phone: "",
    showPhone: false,
    address: "",
    customFields: [],
    bankAccounts: [],
    attachments: [],
  };

  const handleSubmit = (values: VendorFormValues) => {
    setSubmitting(true);
    addVendor(values);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setSubmitting(false);
      router.push("/dashboard/vendors");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 ">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
        <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">Create Vendor</h1>
        <VendorForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitLabel={submitting ? "Saving..." : "Save"}
          loading={submitting}
          onCancel={() => router.back()}
        />
        {showToast && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-base font-medium transition-all">
            Vendor created successfully!
          </div>
        )}
      </div>
    </div>
  );
} 