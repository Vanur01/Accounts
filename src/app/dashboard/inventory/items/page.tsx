"use client";

import React, { useState, useMemo } from "react";
import AddItemModal from "@/components/AddItemModal";
import { useItemStore } from "@/stores/useItemStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useSubcategoryStore } from "@/stores/useSubcategoryStore";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ItemsPage() {
  const searchParams = useSearchParams();
  const subcategoryId = Number(searchParams.get("subcategoryId"));
  const { subcategories } = useSubcategoryStore();
  const subcategory = subcategories.find((sub) => sub.id === subcategoryId);

  const allItems = useItemStore((state) => state.items);
  const items = useMemo(
    () => allItems.filter(item => item.subcategoryId === subcategoryId),
    [allItems, subcategoryId]
  );
  const addItem = useItemStore((state) => state.addItem);
  const editItem = useItemStore((state) => state.editItem);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  // Removed category state and logic

  const handleAddItem = (item: { name: string; description: string; price: number; type: string }) => {
    addItem({ ...item, subcategoryId });
  };

  const handleEditItem = (item: { name: string; description: string; price: number; type: string }) => {
    if (editId !== null) {
      editItem(editId, { ...item, subcategoryId });
    }
  };

  const openEditModal = (id: number) => {
    setEditId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
  };

  const editingItem = editId !== null ? items.find((item) => item.id === editId) : null;

  // Group items by category (optional, can be removed if not needed)
  // const itemsByCategory = items.reduce((acc, item) => {
  //   const cat = item.category || "Uncategorized";
  //   if (!acc[cat]) acc[cat] = [];
  //   acc[cat].push(item);
  //   return acc;
  // }, {} as Record<string, typeof items>);

  return (
    <div className="max-w-4xl mx-auto rounded-lg shadow p-8" style={{ background: 'var(--color-card)', color: 'var(--color-card-foreground)' }}>
      <div className="mb-4">
        {subcategory && (
          <Link
            href={`/dashboard/inventory/subcategory?categoryId=${subcategory.categoryId}`}
            className="text-muted-foreground hover:text-primary underline text-sm"
          >
            &larr; Back to Subcategories
          </Link>
        )}
      </div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Items</h1>
          {subcategory && (
            <div className="text-muted-foreground text-sm">for Subcategory: <span className="font-semibold">{subcategory.name}</span></div>
          )}
        </div>
        <button
          style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
          className="px-4 py-2 rounded font-semibold hover:opacity-90 transition border border-[var(--color-primary)]"
          onClick={() => { setModalOpen(true); setEditId(null); }}
        >
          + Add Item
        </button>
      </div>
      {/* Removed category add and list UI */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y" style={{ borderColor: 'var(--color-border)' }}>
          <thead style={{ background: 'var(--color-muted)' }}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>#</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted-foreground)' }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ background: 'var(--color-card)' }}>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap font-mono">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{item.price.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="px-3 py-1 rounded border border-[var(--color-primary)] text-sm font-medium hover:opacity-90 transition"
                    style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
                    onClick={() => openEditModal(item.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-400">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddItemModal
        open={modalOpen}
        onClose={closeModal}
        onSubmit={editId === null ? handleAddItem : handleEditItem}
        initialValues={editingItem ? {
          name: editingItem.name,
          description: editingItem.description,
          price: editingItem.price,
          type: editingItem.type,
          category: editingItem.category,
          hsn: editingItem.hsn,
          unit: editingItem.unit,
          igst: editingItem.igst,
          sgst: editingItem.sgst,
          cgst: editingItem.cgst,
        } : undefined}
        submitLabel={editId === null ? "Add Item" : "Update Item"}
      />
    </div>
  );
}
