import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";

const INDUSTRIES = [
  "Manufacturing",
  "Retail",
  "IT",
  "Healthcare",
  "Education",
  "Finance",
  "Other",
];
const COUNTRIES = ["India", "USA", "UK", "Other"];
const STATES = [
  "Andhra Pradesh", "Delhi", "Gujarat", "Karnataka", "Maharashtra", "Tamil Nadu", "West Bengal", "Other"
];
const GST_TYPES = ["Regular", "Composition", "Unregistered", "Consumer"];
const TAX_TREATMENTS = ["Registered Business", "Unregistered Business", "Consumer", "Overseas"];
const VENDOR_TYPES = ["Individual", "Company"];
const ACCOUNT_TYPES = ["Savings", "Current", "Other"];

export type VendorFormValues = {
  name: string;
  industry?: string;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;
  streetAddress?: string;
  gstin?: string;
  panNumber?: string;
  gstType?: string;
  taxTreatment?: string;
  vendorType?: string;
  displayName?: string;
  uniqueKey?: string;
  email?: string;
  showEmail?: boolean;
  contact?: string;
  phone?: string;
  showPhone?: boolean;
  address?: string;
  customFields?: { label: string; value: string }[];
  bankAccounts?: {
    bankName: string;
    accountNumber: string;
    ifsc: string;
    branch?: string;
    accountType?: string;
  }[];
  attachments?: { name: string; url: string }[];
};

type VendorFormProps = {
  initialValues: VendorFormValues;
  onSubmit: (values: VendorFormValues) => void;
  submitLabel: string;
  loading?: boolean;
  onCancel?: () => void;
};

export default function VendorForm({ initialValues, onSubmit, submitLabel, loading, onCancel }: VendorFormProps) {
  const [form, setForm] = useState<VendorFormValues>({ ...initialValues });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [openSections, setOpenSections] = useState<{ [k: string]: boolean }>({});

  useEffect(() => {
    setForm({ ...initialValues });
  }, [initialValues]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper for animated section
  const Section = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }) => (
    <div className="pt-6">
      <button
        type="button"
        className="flex items-center w-full justify-between py-3 px-2 text-left font-semibold text-lg rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 hover:bg-gray-50"
        onClick={() => toggleSection(sectionKey)}
        aria-expanded={!!openSections[sectionKey]}
      >
        <span>{title}</span>
        <FaChevronDown
          className={`ml-2 text-base transition-transform duration-300 ${openSections[sectionKey] ? "rotate-180" : "rotate-0"}`}
        />
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${openSections[sectionKey] ? "max-h-[1000px] mt-3" : "max-h-0"}`}
      >
        <div className={`rounded-xl bg-white shadow-sm px-4 py-6 ${openSections[sectionKey] ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}>{children}</div>
      </div>
    </div>
  );

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm({
        ...form,
        [name]: e.target.checked,
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  // Custom Fields
  const addCustomField = () => {
    setForm({
      ...form,
      customFields: [...(form.customFields || []), { label: "", value: "" }],
    });
  };
  const updateCustomField = (idx: number, key: "label" | "value", value: string) => {
    const updated = [...(form.customFields || [])];
    updated[idx][key] = value;
    setForm({ ...form, customFields: updated });
  };
  const removeCustomField = (idx: number) => {
    const updated = [...(form.customFields || [])];
    updated.splice(idx, 1);
    setForm({ ...form, customFields: updated });
  };

  // Bank Accounts
  const addBankAccount = () => {
    setForm({
      ...form,
      bankAccounts: [
        ...(form.bankAccounts || []),
        { bankName: "", accountNumber: "", ifsc: "", branch: "", accountType: "" },
      ],
    });
  };
  const updateBankAccount = <K extends keyof (NonNullable<typeof form.bankAccounts>[number])>(idx: number, key: K, value: NonNullable<typeof form.bankAccounts>[number][K]) => {
    const updated = [...(form.bankAccounts || [])];
    updated[idx] = { ...updated[idx], [key]: value };
    setForm({ ...form, bankAccounts: updated });
  };
  const removeBankAccount = (idx: number) => {
    const updated = [...(form.bankAccounts || [])];
    updated.splice(idx, 1);
    setForm({ ...form, bankAccounts: updated });
  };

  // Validation
  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!form.name) errs.name = "Business Name is required";
    if (!form.country) errs.country = "Country is required";
    if (!form.city) errs.city = "City/Town is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info (always visible) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Business Name <span className="text-destructive">*</span></label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Business Name"
            className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
          />
          {errors.name && <div className="text-xs mt-1 text-destructive">{errors.name}</div>}
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Display Name</label>
          <Input
            type="text"
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            placeholder="Display Name"
            className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Industry</label>
          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className="h-11 w-full text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
          >
            <option value="">-Select an Industry-</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Vendor Type</label>
          <select
            name="vendorType"
            value={form.vendorType}
            onChange={handleChange}
            className="h-11 w-full text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
          >
            {VENDOR_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="border-b border-gray-200" />

      {/* Tax Information Section */}
      <Section title="Tax Information (optional)" sectionKey="tax">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Business GSTIN</label>
            <Input
              type="text"
              name="gstin"
              value={form.gstin}
              onChange={handleChange}
              placeholder="Business GSTIN (Optional)"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">GST Type</label>
            <select
              name="gstType"
              value={form.gstType}
              onChange={handleChange}
              className="h-11 w-full text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            >
              <option value="">Check GST Type</option>
              {GST_TYPES.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Business PAN Number</label>
            <Input
              type="text"
              name="panNumber"
              value={form.panNumber}
              onChange={handleChange}
              placeholder="Business PAN Number (Optional)"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Tax Treatment</label>
            <select
              name="taxTreatment"
              value={form.taxTreatment}
              onChange={handleChange}
              className="h-11 w-full text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            >
              <option value="">Select Tax Treatment</option>
              {TAX_TREATMENTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      {/* Address Section */}
      <Section title="Address (optional)" sectionKey="address">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="h-11 w-full text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            >
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.country && <div className="text-xs mt-1 text-destructive">{errors.country}</div>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">State / Province</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              className="h-11 w-full text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            >
              <option value="">Select State / Province</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">City/Town</label>
            <Input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City/Town Name"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
            {errors.city && <div className="text-xs mt-1 text-destructive">{errors.city}</div>}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Postal Code / Zip Code</label>
            <Input
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Postal Code / Zip Code"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Street Address</label>
            <Input
              type="text"
              name="streetAddress"
              value={form.streetAddress}
              onChange={handleChange}
              placeholder="Street Address"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2">Address</label>
            <Input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full Address"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
          </div>
        </div>
      </Section>

      {/* Additional Details Section */}
      <Section title="Additional Details (optional)" sectionKey="details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Unique Key</label>
            <Input
              type="text"
              name="uniqueKey"
              value={form.uniqueKey}
              onChange={handleChange}
              readOnly
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
            <label className="inline-flex items-center mt-2 ml-2 text-sm">
              <input
                type="checkbox"
                name="showEmail"
                checked={form.showEmail}
                onChange={handleChange}
                className="mr-1 accent-primary"
              />
              Show Email in Invoice
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Phone No.</label>
            <Input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
            <label className="inline-flex items-center mt-2 ml-2 text-sm">
              <input
                type="checkbox"
                name="showPhone"
                checked={form.showPhone}
                onChange={handleChange}
                className="mr-1 accent-primary"
              />
              Show Phone in Invoice
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Contact</label>
            <Input
              type="text"
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Contact Person"
              className="h-11 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
            />
          </div>
          {/* Custom Fields */}
          <div className="md:col-span-2 mt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Custom Fields</span>
              <Button type="button" variant="outline" size="sm" onClick={addCustomField} className="rounded-full px-3 py-1 text-sm">Add Custom Field</Button>
            </div>
            {form.customFields && form.customFields.length > 0 && (
              <div className="space-y-2">
                {form.customFields.map((cf, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <Input
                      type="text"
                      placeholder="Label"
                      value={cf.label}
                      onChange={e => updateCustomField(idx, "label", e.target.value)}
                      className="w-1/3 h-10 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
                    />
                    <Input
                      type="text"
                      placeholder="Value"
                      value={cf.value}
                      onChange={e => updateCustomField(idx, "value", e.target.value)}
                      className="w-1/2 h-10 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
                    />
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeCustomField(idx)} className="rounded-full px-3 py-1 text-sm">Remove</Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Attachments Section */}
      <Section title="Attachments (optional)" sectionKey="attachments">
        <div className="mt-2 text-sm text-gray-500">Attachment upload coming soon.</div>
      </Section>

      {/* Bank Accounting Details Section */}
      <Section title="Bank Accounting Details (optional)" sectionKey="bank">
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Accounts</span>
            <Button type="button" variant="outline" size="sm" onClick={addBankAccount} className="rounded-full px-3 py-1 text-sm">Add Bank Account</Button>
          </div>
          {form.bankAccounts && form.bankAccounts.length > 0 && (
            <div className="space-y-4">
              {form.bankAccounts.map((ba, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-end border rounded-lg p-3 bg-white shadow-sm">
                  <Input
                    type="text"
                    placeholder="Bank Name"
                    value={ba.bankName}
                    onChange={e => updateBankAccount(idx, "bankName", e.target.value)}
                    className="h-10 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
                  />
                  <Input
                    type="text"
                    placeholder="Account Number"
                    value={ba.accountNumber}
                    onChange={e => updateBankAccount(idx, "accountNumber", e.target.value)}
                    className="h-10 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
                  />
                  <Input
                    type="text"
                    placeholder="IFSC Code"
                    value={ba.ifsc}
                    onChange={e => updateBankAccount(idx, "ifsc", e.target.value)}
                    className="h-10 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
                  />
                  <Input
                    type="text"
                    placeholder="Branch"
                    value={ba.branch || ""}
                    onChange={e => updateBankAccount(idx, "branch", e.target.value)}
                    className="h-10 text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
                  />
                  <select
                    value={ba.accountType || ""}
                    onChange={e => updateBankAccount(idx, "accountType", e.target.value)}
                    className="h-10 w-full text-base px-3 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg shadow-sm"
                  >
                    <option value="">Account Type</option>
                    {ACCOUNT_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <Button type="button" variant="destructive" size="sm" onClick={() => removeBankAccount(idx)} className="rounded-full px-3 py-1 text-sm">Remove</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Actions */}
      <div className="flex justify-end gap-3 mt-8">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="rounded-lg px-6 py-2 text-base font-semibold border-gray-300 hover:bg-gray-100 shadow-sm"
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="rounded-lg px-6 py-2 text-base font-semibold border border-[var(--color-primary)] hover:opacity-90 transition shadow-sm flex items-center gap-2"
          style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
          disabled={loading}
        >
          {loading && (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          )}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
