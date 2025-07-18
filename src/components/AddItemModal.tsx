import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AddItemModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (item: { name: string; description: string; price: number; type: string; category?: string; hsn?: string; unit?: string; igst?: number; sgst?: number; cgst?: number }) => void;
  initialValues?: { name: string; description: string; price: number | string; type: string; category?: string; hsn?: string; unit?: string; igst?: number | string; sgst?: number | string; cgst?: number | string };
  submitLabel?: string;
}

export default function AddItemModal({ open, onClose, onSubmit, initialValues, submitLabel = "Add Item" }: AddItemModalProps) {
  const [form, setForm] = useState<{ name: string; description: string; price: string | number; type: string; category?: string; hsn?: string; unit?: string; igst?: string; sgst?: string; cgst?: string }>({ name: "", description: "", price: "", type: "Good", category: "", hsn: "", unit: "", igst: "", sgst: "", cgst: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const categories = useCategoryStore((state) => state.categories);
  const addCategory = useCategoryStore((state) => state.addCategory);
  const [newCategory, setNewCategory] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        description: initialValues.description || "",
        price: initialValues.price?.toString() || "",
        type: initialValues.type || "Good",
        category: initialValues.category || "",
        hsn: initialValues.hsn || "",
        unit: initialValues.unit || "",
        igst: initialValues.igst?.toString() || "",
        sgst: initialValues.sgst?.toString() || "",
        cgst: initialValues.cgst?.toString() || "",
      });
    } else {
      setForm({ name: "", description: "", price: "", type: "Good", category: "", hsn: "", unit: "", igst: "", sgst: "", cgst: "" });
    }
  }, [initialValues, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type: inputType } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const errs: { [k: string]: string } = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.price || isNaN(Number(form.price))) errs.price = "Valid price is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      onSubmit({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        type: form.type,
        category: form.category || "",
        hsn: form.hsn,
        unit: form.unit,
        igst: form.igst ? Number(form.igst) : undefined,
        sgst: form.sgst ? Number(form.sgst) : undefined,
        cgst: form.cgst ? Number(form.cgst) : undefined,
      });
      setForm({ name: "", description: "", price: "", type: "Good", category: "", hsn: "", unit: "", igst: "", sgst: "", cgst: "" });
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="w-full max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-2">{submitLabel === "Add Item" ? "Add New Item" : "Edit Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="font-semibold mb-3 text-lg">Item Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Name *</label>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <div className="text-xs mt-1" style={{ color: 'var(--color-destructive)' }}>{errors.name}</div>}
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Price *</label>
                <Input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                />
                {errors.price && <div className="text-xs mt-1" style={{ color: 'var(--color-destructive)' }}>{errors.price}</div>}
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Category <span className="text-gray-400">(optional)</span></label>
                <div className="flex gap-2 items-center">
                  <Select
                    value={form.category || ""}
                    onValueChange={val => setForm({ ...form, category: val })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" variant="link" size="sm" className="px-1" onClick={() => setShowAddCategory(v => !v)}>
                    {showAddCategory ? "Cancel" : "Add new"}
                  </Button>
                </div>
                {showAddCategory && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="text"
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      placeholder="New category name"
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        if (newCategory.trim()) {
                          addCategory(newCategory.trim());
                          setForm(f => ({ ...f, category: newCategory.trim() }));
                          setNewCategory("");
                          setShowAddCategory(false);
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold mb-1">Description</label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
              />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold mb-1">Type *</label>
              <div className="flex gap-4 p-2 rounded  mt-1">
                <label className="flex items-center gap-1 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="type"
                    value="Good"
                    checked={form.type === "Good"}
                    onChange={handleChange}
                    className="accent-[var(--color-primary)]"
                  />
                  Good
                </label>
                <label className="flex items-center gap-1 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="type"
                    value="Service"
                    checked={form.type === "Service"}
                    onChange={handleChange}
                    className="accent-[var(--color-primary)]"
                  />
                  Service
                </label>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">HSN/SAC <span className="text-gray-400">(optional)</span></label>
                <Input
                  type="text"
                  name="hsn"
                  value={form.hsn || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Unit <span className="text-gray-400">(optional)</span></label>
                <Input
                  type="text"
                  name="unit"
                  value={form.unit || ""}
                  onChange={handleChange}
                  placeholder="e.g. pcs, kg, box"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">IGST (%) <span className="text-gray-400">(optional)</span></label>
                <Input
                  type="number"
                  name="igst"
                  value={form.igst || ""}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">SGST (%) <span className="text-gray-400">(optional)</span></label>
                <Input
                  type="number"
                  name="sgst"
                  value={form.sgst || ""}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">CGST (%) <span className="text-gray-400">(optional)</span></label>
                <Input
                  type="number"
                  name="cgst"
                  value={form.cgst || ""}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <button
                type="button"
                className="px-4 py-2 rounded font-medium border border-[var(--color-muted)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)] transition"
                style={{ background: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}
                onClick={onClose}
              >
                Cancel
              </button>
            </DialogClose>
            <button
              type="submit"
              className="px-4 py-2 rounded font-semibold border border-[var(--color-primary)] hover:opacity-90 transition"
              style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
            >
              {submitLabel}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
