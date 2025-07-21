"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";
import AddClientModal, { AddClientForm } from "@/components/AddClientModal";
import AddItemModal from "@/components/AddItemModal";
import AddItemBulkModal from "@/components/AddItemBulkModal";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { IoCloseCircle } from "react-icons/io5";
import SignaturePad from "@/components/SignaturePad";
import ConfigureTax from "@/components/ConfigureTax";
import type { Cess } from "@/components/ConfigureTax";
import { IoClose } from "react-icons/io5";
import PhaseWisePayment, { PaymentPhase } from "@/components/PhaseWisePayment";
import QuotationForm, { QuotationFormValues } from "@/components/quotation/QuotationForm";
import { useQuotationStore } from "@/stores/useQuotationStore";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useClientStore } from "@/stores/useClientStore";
import { useItemStore } from "@/stores/useItemStore";


export default function EditQuotationPage() {
  const params = useParams();
  const router = useRouter();
  const { clients } = useClientStore();
  const { quotations, updateQuotation } = useQuotationStore();
  const { items } = useItemStore();
  const [loading, setLoading] = useState(false);

  // Get quotation number from URL (id param)
  const quotationNumber = Array.isArray(params.id) ? params.id[0] : params.id;
  const initialValues = quotations.find(q => q.quotationNumber === quotationNumber);

  useEffect(()=>{
    
  },[])

  if (!initialValues) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  const handleUpdate = async (values: QuotationFormValues) => {
    setLoading(true);
    try {
      await updateQuotation(values.quotationNumber, values);
      router.push("/dashboard/quotations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuotationForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      mode="edit"
      mockClients={clients}
      mockProducts={items}
      loading={loading}
    />
  );
}
// TODO: Refactor shared components to a common file for DRY code.
