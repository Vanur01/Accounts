"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useVendorStore } from "@/stores/useVendorStore";
import { useRouter } from "next/navigation";

export default function CreateVendorPage() {
  const [form, setForm] = useState({
    name: "",
    gstin: "",
    contact: "",
    email: "",
    address: "",
  });
  const addVendor = useVendorStore((state) => state.addVendor);
  const router = useRouter();
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!form.name) errs.name = "Name is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      addVendor(form);
      router.push("/dashboard/inventory/items/create");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Create Vendor</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1">Name *</label>
            <Input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Vendor Name"
            />
            {errors.name && <div className="text-xs mt-1 text-destructive">{errors.name}</div>}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">GSTIN</label>
            <Input
              type="text"
              name="gstin"
              value={form.gstin}
              onChange={handleChange}
              placeholder="e.g. 22AAAAA0000A1Z5"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Contact</label>
            <Input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="e.g. 9876543210"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. vendor@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1">Address</label>
            <Input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="e.g. 123 Main St, City"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" className="px-4 py-2 rounded font-semibold border border-[var(--color-primary)] hover:opacity-90 transition" style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}>
              Create Vendor
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 