"use client";
import React, { useState } from "react";
import { useVendorStore } from "@/stores/useVendorStore";
import { useRouter, useParams } from "next/navigation";
import VendorForm, { VendorFormValues } from "@/components/vendor/VendorForm";

export default function EditVendorPage() {
  const { id } = useParams();
  const vendorId = Number(id);
  const vendors = useVendorStore((state) => state.vendors);
  const editVendor = useVendorStore((state) => state.editVendor);
  const vendor = vendors.find((v) => v.id === vendorId);
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center text-gray-500 text-xl">Vendor not found.</div>
      </div>
    );
  }

  const initialValues: VendorFormValues = {
    name: vendor.name || "",
    industry: vendor.industry || "",
    country: vendor.country || "India",
    state: vendor.state || "",
    city: vendor.city || "",
    postalCode: vendor.postalCode || "",
    streetAddress: vendor.streetAddress || "",
    gstin: vendor.gstin || "",
    panNumber: vendor.panNumber || "",
    gstType: vendor.gstType || "",
    taxTreatment: vendor.taxTreatment || "",
    vendorType: vendor.vendorType || "Individual",
    displayName: vendor.displayName || "",
    uniqueKey: vendor.uniqueKey || Date.now().toString(),
    email: vendor.email || "",
    showEmail: vendor.showEmail || false,
    contact: vendor.contact || "",
    phone: vendor.phone || "",
    showPhone: vendor.showPhone || false,
    address: vendor.address || "",
    // customFields: vendor.customFields ? [...vendor.customFields] : [],
    // bankAccounts: vendor.bankAccounts ? [...vendor.bankAccounts] : [],
    attachments: vendor.attachments ? [...vendor.attachments] : [],
  };

  const handleSubmit = (values: VendorFormValues) => {
    setSubmitting(true);
    editVendor(vendor.id, values);
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
        <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">Edit Vendor</h1>
        <VendorForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitLabel={submitting ? "Updating..." : "Update"}
          loading={submitting}
          onCancel={() => router.back()}
        />
        {showToast && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-base font-medium transition-all">
            Vendor updated successfully!
          </div>
        )}
      </div>
    </div>
  );
}
