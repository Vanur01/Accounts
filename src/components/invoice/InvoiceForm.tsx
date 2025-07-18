import React, { useState } from "react";
import ClientSection from "../ClientSection";
import ItemTable from "../ItemTable";
import SummaryCard from "../SummaryCard";
import AdditionalInputs from "../AdditionalInputs";
import ActionBar from "../ActionBar";
import AddClientModal from "@/components/AddClientModal";
import AddItemModal from "@/components/AddItemModal";
import AddItemBulkModal from "@/components/AddItemBulkModal";
import type { Cess } from "@/components/ConfigureTax";
import InvoiceHeaderBar from "./HeaderBar";
// InvoiceHeaderBar will be created next

export type InvoiceFormValues = {
  invoiceTitle: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  clientId: string;
  clientDetails: {
    name: string;
    gstin: string;
    address: string;
    contact: string;
    email: string;
  };
  taxType: string;
  items: any[];
  discountType: string;
  discountValue: number;
  shipping: number;
  roundOff: boolean;
  showHSN: boolean;
  showUnit: boolean;
  terms: string;
  notes: string;
  attachments: File[];
  showSignature: boolean;
  cessList: Cess[];
};

type InvoiceFormProps = {
  initialValues: InvoiceFormValues;
  onSubmit: (values: InvoiceFormValues) => void;
  mode?: "create" | "edit";
  onSuccess?: () => void;
  loading?: boolean;
  mockClients?: any[];
  mockProducts?: any[];
};

const InvoiceForm: React.FC<any> = ({ initialValues, onSubmit, mode, mockClients, mockProducts, onSuccess, loading }) => {
  const clients = mockClients || [];
  const products = mockProducts || [];
  const [invoiceTitle, setInvoiceTitle] = useState(initialValues.invoiceTitle);
  const [invoiceNumber] = useState(initialValues.invoiceNumber);
  const [date, setDate] = useState(initialValues.date);
  const [dueDate, setDueDate] = useState(initialValues.dueDate);
  const [clientId, setClientId] = useState(initialValues.clientId);
  const [showAddClient, setShowAddClient] = useState(false);
  const [clientDetails, setClientDetails] = useState(initialValues.clientDetails);
  const [taxType, setTaxType] = useState(initialValues.taxType);
  const [items, setItems] = useState(initialValues.items);
  const [discountType, setDiscountType] = useState(initialValues.discountType);
  const [discountValue, setDiscountValue] = useState(initialValues.discountValue);
  const [shipping, setShipping] = useState(initialValues.shipping);
  const [roundOff, setRoundOff] = useState(initialValues.roundOff);
  const [showHSN, setShowHSN] = useState(initialValues.showHSN);
  const [showUnit, setShowUnit] = useState(initialValues.showUnit);
  const [terms, setTerms] = useState(initialValues.terms);
  const [notes, setNotes] = useState(initialValues.notes);
  const [attachments, setAttachments] = useState<File[]>(initialValues.attachments);
  const [showSignature, setShowSignature] = useState(initialValues.showSignature);
  const [cessList, setCessList] = useState<Cess[]>(initialValues.cessList || []);

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showAddItemBulkModal, setShowAddItemBulkModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleItemChange = (idx: number, field: string, value: any) => {
    setItems((prev: any) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      // Recalculate amount
      const item = updated[idx];
      let amount = (Number(item.qty) || 0) * (Number(item.rate) || 0) - (Number(item.discount) || 0);
      // Add tax if present
      if (taxType === "IGST") amount += (amount * (Number(item.igst) || 0)) / 100;
      if (taxType === "SGST_CGST") amount += (amount * ((Number(item.sgst) || 0) + (Number(item.cgst) || 0)) ) / 100;
      updated[idx].amount = amount;
      return updated;
    });
  };
  const handleAddItem = () => {
    setItems((prev: any) => [
      ...prev,
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
    ]);
  };
  const handleRemoveItem = (idx: number) => {
    setItems((prev: any) => prev.filter((_: any, i: any) => i !== idx));
  };
  const onAddNewItemClick = () => setShowAddItemModal(true);
  const openBulkModal = () => setShowAddItemBulkModal(true);

  const handleAddClient = () => setShowAddClient(true);

  const handleClientSelect = (value: string) => {
    setClientId(value);
    if (value === "new") return;
    const found = clients.find((c: any) => String(c.id) === value);
    if (found) {
      setClientDetails({
        name: found.name,
        gstin: found.gstin,
        address: found.address,
        contact: found.contact,
        email: found.email,
      });
    }
  };

  // Summary calculations
  const subtotal = items.reduce((sum: number, item: any) => sum + (Number(item.qty) * Number(item.rate)), 0);
  let discount = 0;
  if (discountType === "flat") discount = discountValue;
  else if (discountType === "percent") discount = (subtotal * discountValue) / 100;
  const taxable = subtotal - discount;
  let tax = 0;
  if (taxType === "IGST") tax = items.reduce((sum: number, item: any) => sum + ((item.amount - (item.discount || 0)) * (Number(item.igst) || 0) / 100), 0);
  if (taxType === "SGST_CGST") tax = items.reduce((sum: number, item: any) => sum + ((item.amount - (item.discount || 0)) * ((Number(item.sgst) || 0) + (Number(item.cgst) || 0)) / 100), 0);
  let total = taxable + tax + Number(shipping || 0);
  if (roundOff) total = Math.round(total);

  const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleFormSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    if (!invoiceTitle.trim()) newErrors.invoiceTitle = "Invoice title is required";
    if (!invoiceNumber.trim()) newErrors.invoiceNumber = "Invoice number is required";
    if (!date) newErrors.date = "Invoice date is required";
    if (!items || items.length === 0 || items.every((item: any) => !item.name.trim())) newErrors.items = "At least one item is required";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    onSubmit({
      invoiceTitle,
      invoiceNumber,
      date,
      dueDate,
      clientId,
      clientDetails,
      taxType,
      items,
      discountType,
      discountValue,
      shipping,
      roundOff,
      showHSN,
      showUnit,
      terms,
      notes,
      attachments,
      showSignature,
      cessList,
    });
    if (onSuccess) onSuccess();
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 md:px-8 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <InvoiceHeaderBar
        title={invoiceTitle}
        onTitleChange={e => setInvoiceTitle(e.target.value)}
        invoiceNumber={invoiceNumber}
        date={date}
        onDateChange={setDate}
        dueDate={dueDate}
        onDueDateChange={setDueDate}
      />
      <div className="mb-2">
        {errors.invoiceTitle && <div className="text-red-500 text-xs">{errors.invoiceTitle}</div>}
        {errors.invoiceNumber && <div className="text-red-500 text-xs">{errors.invoiceNumber}</div>}
        {errors.date && <div className="text-red-500 text-xs">{errors.date}</div>}
      </div>
      <ClientSection
        clientId={clientId}
        onClientSelect={handleClientSelect}
        showAddClient={showAddClient}
        setShowAddClient={setShowAddClient}
        clientDetails={clientDetails}
        setClientDetails={setClientDetails}
        handleAddClient={handleAddClient}
        mockClients={clients}
      />
      <ItemTable
        items={items}
        setItems={setItems}
        handleItemChange={handleItemChange}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        showHSN={showHSN}
        setShowHSN={setShowHSN}
        showUnit={showUnit}
        setShowUnit={setShowUnit}
        onAddNewItemClick={onAddNewItemClick}
        openBulkModal={openBulkModal}
        taxType={taxType}
        cessList={cessList}
        setTaxType={setTaxType}
        setCessList={setCessList}
        mockProducts={products}
      />
      {errors.items && <div className="text-red-500 text-xs mb-2">{errors.items}</div>}
      <SummaryCard
        subtotal={subtotal}
        discountType={discountType}
        discountValue={discountValue}
        setDiscountType={setDiscountType}
        setDiscountValue={setDiscountValue}
        tax={tax}
        shipping={shipping}
        setShipping={setShipping}
        roundOff={roundOff}
        setRoundOff={setRoundOff}
        total={total}
      />
      <AdditionalInputs
        terms={terms}
        setTerms={setTerms}
        notes={notes}
        setNotes={setNotes}
        attachments={attachments}
        handleAttachment={handleAttachment}
        showSignature={showSignature}
        setShowSignature={setShowSignature}
      />
      <ActionBar mode={mode} onSubmit={handleFormSubmit} loading={loading} />
      <AddClientModal open={showAddClient} onClose={() => setShowAddClient(false)} onSubmit={form => {
        setClientDetails({
          name: form.businessName,
          gstin: form.gstin,
          address: form.street,
          contact: form.phone,
          email: form.email,
        });
        setShowAddClient(false);
      }} />
      <AddItemModal open={showAddItemModal} onClose={() => setShowAddItemModal(false)} onSubmit={item => {
        setItems((prev: any) => [
          ...prev,
          {
            name: item.name,
            description: item.description,
            qty: 1,
            rate: item.price,
            discount: 0,
            igst: 0,
            sgst: 0,
            cgst: 0,
            amount: item.price,
            hsn: "",
            unit: "pcs",
          },
        ]);
        setShowAddItemModal(false);
      }} />
      <AddItemBulkModal open={showAddItemBulkModal} onClose={() => setShowAddItemBulkModal(false)} onSubmit={bulkItems => {
        setItems((prev: any) => [
          ...prev,
          ...bulkItems.map(item => ({
            name: item.name,
            description: "",
            qty: item.unit,
            rate: 0,
            discount: 0,
            igst: 0,
            sgst: 0,
            cgst: 0,
            amount: 0,
            hsn: "",
            unit: "pcs",
          })),
        ]);
        setShowAddItemBulkModal(false);
      }} />
    </div>
  );
};

export default InvoiceForm;
