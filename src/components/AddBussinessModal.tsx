import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useBussinessStore } from "../stores/useBussinessStore";

const TEAM_SIZES = [
  "Just Me",
  "2-5",
  "6-20",
  "21-50",
  "51-200",
  "201+",
];

const COUNTRIES = [
  { label: "India", value: "IN" },
  // Add more countries as needed
];

const CURRENCIES = [
  { label: "Indian Rupee (INR, ₹)", value: "INR" },
  // Add more currencies as needed
];

export function AddBussinessModal({ onSubmit, open: controlledOpen, setOpen: setControlledOpen, initialValues }: {
  onSubmit?: (data: any) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  initialValues?: any;
}) {
  const isControlled = controlledOpen !== undefined && setControlledOpen !== undefined;
  const [open, setOpen] = useState(false);
  const actualOpen = isControlled ? controlledOpen : open;
  const actualSetOpen = isControlled ? setControlledOpen : setOpen;

  const defaultForm = {
    businessName: "",
    brandName: "",
    teamSize: "",
    website: "",
    phone: "",
    country: COUNTRIES[0].value,
    currency: CURRENCIES[0].value,
    hasGst: false,
    gstNumber: "",
  };
  const [form, setForm] = useState(initialValues ? { ...defaultForm, ...initialValues } : defaultForm);
  useEffect(() => {
    if (initialValues) {
      setForm({ ...defaultForm, ...initialValues });
    }
  }, [initialValues]);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const setDetails = useBussinessStore((s) => s.setDetails);

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
    setErrors((prev: any) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.businessName) newErrors.businessName = "Business Name is required";
    if (!form.teamSize) newErrors.teamSize = "Team Size is required";
    if (!form.phone) newErrors.phone = "Phone Number is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.currency) newErrors.currency = "Currency is required";
    if (form.hasGst && !form.gstNumber) newErrors.gstNumber = "GST Number is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (onSubmit) {
      onSubmit(form);
    } else {
      setDetails(form);
    }
    actualSetOpen(false);
  };

  return (
    <Dialog open={actualOpen} onOpenChange={actualSetOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button variant="outline">Add Business</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tell us about your business</DialogTitle>
            <DialogDescription>
              This helps us personalize your experience
            </DialogDescription>
          </DialogHeader>
          <Card className="mt-4">
            <CardContent className="flex flex-col gap-4">
              {/* 1. Business Name */}
              <div>
                <label className="font-medium">Business Name <span className="text-destructive">*</span></label>
                <Input
                  placeholder="Official Name used across Accounting documents and reports."
                  value={form.businessName}
                  onChange={e => handleChange("businessName", e.target.value)}
                  aria-invalid={!!errors.businessName}
                />
                <div className="text-xs text-muted-foreground">If you're a freelancer, add your personal name</div>
                {errors.businessName && <div className="text-xs text-destructive">{errors.businessName}</div>}
              </div>
              {/* Brand/Display Name */}
              <div>
                <label className="font-medium">Add Brand or Display name</label>
                <Input
                  placeholder="Brand or Display Name (optional)"
                  value={form.brandName}
                  onChange={e => handleChange("brandName", e.target.value)}
                />
              </div>
              {/* 2. Team Size */}
              <div>
                <label className="font-medium">Team Size <span className="text-destructive">*</span></label>
                <Select
                  value={form.teamSize}
                  onValueChange={v => handleChange("teamSize", v)}
                >
                  <SelectTrigger aria-invalid={!!errors.teamSize}>
                    <SelectValue placeholder="Select Team Size" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_SIZES.map(size => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.teamSize && <div className="text-xs text-destructive">{errors.teamSize}</div>}
              </div>
              {/* 3. Website */}
              <div>
                <label className="font-medium">Website</label>
                <Input
                  placeholder="Your Work Website (optional)"
                  value={form.website}
                  onChange={e => handleChange("website", e.target.value)}
                />
                <div className="text-xs text-muted-foreground">Add your business or work website. Helps potential clients find you faster.</div>
              </div>
              {/* 4. Phone Number */}
              <div>
                <label className="font-medium">Phone Number <span className="text-destructive">*</span></label>
                <Input
                  placeholder="Contact phone number associated with your business"
                  value={form.phone}
                  onChange={e => handleChange("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <div className="text-xs text-destructive">{errors.phone}</div>}
              </div>
              {/* 5. Country */}
              <div>
                <label className="font-medium">Country <span className="text-destructive">*</span></label>
                <Select
                  value={form.country}
                  onValueChange={v => handleChange("country", v)}
                >
                  <SelectTrigger aria-invalid={!!errors.country}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && <div className="text-xs text-destructive">{errors.country}</div>}
              </div>
              {/* 6. Currency */}
              <div>
                <label className="font-medium">Currency <span className="text-destructive">*</span></label>
                <Select
                  value={form.currency}
                  onValueChange={v => handleChange("currency", v)}
                >
                  <SelectTrigger aria-invalid={!!errors.currency}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map(c => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.currency && <div className="text-xs text-destructive">{errors.currency}</div>}
              </div>
              {/* 7. GST Number */}
              <div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={form.hasGst}
                    onCheckedChange={v => handleChange("hasGst", !!v)}
                    id="has-gst"
                  />
                  <label htmlFor="has-gst" className="font-medium select-none cursor-pointer">Have GST Number?</label>
                </div>
                <div className="text-xs text-muted-foreground mb-1">Add your GSTIN to unlock smart AI and GST workflows.</div>
                {form.hasGst && (
                  <Input
                    placeholder="Enter Your GST Number"
                    value={form.gstNumber}
                    onChange={e => handleChange("gstNumber", e.target.value)}
                    aria-invalid={!!errors.gstNumber}
                  />
                )}
                {errors.gstNumber && <div className="text-xs text-destructive">{errors.gstNumber}</div>}
              </div>
            </CardContent>
          </Card>
          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBussinessModal;
