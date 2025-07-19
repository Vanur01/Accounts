"use client";

import React, { useState, useMemo } from "react";
import AddItemModal from "@/components/AddItemModal";
import { useItemStore } from "@/stores/useItemStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useSubcategoryStore } from "@/stores/useSubcategoryStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, XCircle, List, Grid3x3, MoreHorizontal, ChevronDown } from "lucide-react";
import { FileText, FilePlus2, ShoppingCart } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function AllItemsPage() {
  const allItems = useItemStore((state) => state.items);
  const { categories } = useCategoryStore();
  const { subcategories } = useSubcategoryStore();
  const addItem = useItemStore((state) => state.addItem);
  const editItem = useItemStore((state) => state.editItem);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterSubcategory, setFilterSubcategory] = useState<string>("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'box'>('list');

  // Filter items based on search term and filters
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === "all" || 
                             (item.category && item.category === filterCategory);
      
      const matchesSubcategory = filterSubcategory === "all" || 
                                (item.subcategoryId && item.subcategoryId.toString() === filterSubcategory);
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [allItems, searchTerm, filterCategory, filterSubcategory]);

  // Handle select all
  const allSelected = filteredItems.length > 0 && filteredItems.every(item => selectedItems.includes(item.id));
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  // Handle single select
  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Bulk action placeholder
  const handleBulkDelete = () => {
    // TODO: Implement actual delete logic
    alert(`Delete items: ${selectedItems.join(", ")}`);
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const handleAddItem = (item: { name: string; description: string; price: number; type: string; category?: string; hsn?: string; unit?: string; igst?: number; sgst?: number; cgst?: number }) => {
    addItem(item);
  };

  const handleEditItem = (item: { name: string; description: string; price: number; type: string; category?: string; hsn?: string; unit?: string; igst?: number; sgst?: number; cgst?: number }) => {
    if (editId !== null) {
      editItem(editId, item);
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

  const editingItem = editId !== null ? allItems.find((item) => item.id === editId) : null;

  // Get category and subcategory names for display
  const getCategoryName = (categoryId?: number) => {
    if (!categoryId) return "Uncategorized";
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  const getSubcategoryName = (subcategoryId?: number) => {
    if (!subcategoryId) return "No Subcategory";
    const subcategory = subcategories.find(sub => sub.id === subcategoryId);
    return subcategory ? subcategory.name : "Unknown Subcategory";
  };

  return (
    <div className="max-w-[98vw] w-full mx-auto rounded-md shadow-sm p-4 sm:p-6 md:p-8" style={{ background: 'var(--color-card)', color: 'var(--color-card-foreground)' }}>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-[var(--color-foreground)]">All Items</h1>
          <div className="text-muted-foreground text-xs mt-1">
            Total Items: {allItems.length} | Showing: {filteredItems.length}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-2">
            <button
              className={`p-2 rounded-md border transition text-sm ${viewMode === 'list' ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)] shadow' : 'bg-transparent text-[var(--color-foreground)] border-[var(--color-border)] hover:bg-[var(--color-muted)]'}`}
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List size={18} />
            </button>
            <button
              className={`p-2 rounded-md border transition text-sm ${viewMode === 'box' ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] border-[var(--color-primary)] shadow' : 'bg-transparent text-[var(--color-foreground)] border-[var(--color-border)] hover:bg-[var(--color-muted)]'}`}
              onClick={() => setViewMode('box')}
              aria-label="Box view"
            >
              <Grid3x3 size={18} />
            </button>
          </div>
          <button
            style={{ background: 'var(--color-primary)', color: 'var(--color-primary-foreground)' }}
            className="px-4 py-2 rounded font-medium text-sm hover:opacity-90 transition border border-[var(--color-primary)] shadow-sm"
            onClick={() => { setModalOpen(true); setEditId(null); }}
          >
            + Add Item
          </button>
          {selectedItems.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-sm px-3 py-2 h-8 border-[var(--color-border)] flex items-center gap-1">
                  Bulk Actions <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40 p-1 text-sm">
                 <DropdownMenuItem className="flex items-center gap-2" onClick={() => alert('Invoice action for: ' + selectedItems.join(', '))}>
                   <FileText size={16} /> Invoice
                 </DropdownMenuItem>
                 <DropdownMenuItem className="flex items-center gap-2" onClick={() => alert('Sales Order action for: ' + selectedItems.join(', '))}>
                   <FilePlus2 size={16} /> Sales Order
                 </DropdownMenuItem>
                 <DropdownMenuItem className="flex items-center gap-2" onClick={() => alert('Purchase Order action for: ' + selectedItems.join(', '))}>
                   <ShoppingCart size={16} /> Purchase Order
                 </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2" onClick={handleBulkDelete}>
                    <Trash2 size={16} /> Delete Selected
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2" onClick={handleClearSelection}>
                    <XCircle size={16} /> Clear Selection
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search items by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="min-w-[150px]">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              style={{ background: 'var(--color-background)', color: 'var(--color-foreground)', borderColor: 'var(--color-border)' }}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="min-w-[150px]">
            <select
              value={filterSubcategory}
              onChange={(e) => setFilterSubcategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              style={{ background: 'var(--color-background)', color: 'var(--color-foreground)', borderColor: 'var(--color-border)' }}
            >
              <option value="all">All Subcategories</option>
              {subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id.toString()}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Bulk action bar removed; now handled in header */}

      {/* Items Table or Box View */}
      {viewMode === 'list' ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y rounded-lg overflow-hidden text-sm" style={{ borderColor: 'var(--color-border)' }}>
            <thead className="sticky top-0 z-10" style={{ background: 'var(--color-muted)' }}>
              <tr>
                <th className="px-3 py-3 text-left align-middle w-10">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all items"
                    className="accent-[var(--color-primary)] w-5 h-5 rounded border-[var(--color-border)]"
                  />
                </th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider rounded-tl-lg text-[var(--color-muted-foreground)]">#</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">Name</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">Description</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">Category</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">Subcategory</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">Type</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">Price</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">HSN</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted-foreground)]">Unit</th>
                <th className="px-4 py-2 text-left text-[10px] font-medium uppercase tracking-wider rounded-tr-lg text-[var(--color-muted-foreground)]">Actions</th>
              </tr>
            </thead>
            <tbody style={{ background: 'var(--color-card)' }}>
              {filteredItems.map((item, idx) => (
                <tr key={item.id} className={
                  `transition-colors ${idx % 2 === 0 ? 'bg-[var(--color-card)]' : 'bg-[var(--color-muted)]/40'} hover:bg-[var(--color-muted)]/60 text-sm`
                }>
                  <td className="px-3 py-3 align-middle w-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                      aria-label={`Select item ${item.id}`}
                      className="accent-[var(--color-primary)] w-5 h-5 rounded border-[var(--color-border)]"
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono align-middle text-xs">{item.id}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium align-middle text-base">{item.name}</td>
                  <td className="px-4 py-3 max-w-xs truncate align-middle text-sm text-[var(--color-muted-foreground)]">{item.description}</td>
                  <td className="px-4 py-3 whitespace-nowrap align-middle">
                    <span className="px-2 py-1 text-xs rounded-full" style={{ background: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}>
                      {item.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap align-middle">
                    <span className="px-2 py-1 text-xs rounded-full" style={{ background: 'var(--color-muted)', color: 'var(--color-muted-foreground)' }}>
                      {getSubcategoryName(item.subcategoryId)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap align-middle text-sm">{item.type}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold align-middle text-sm">₹{item.price.toLocaleString()}</td>
                  <td className="px-4 py-3 whitespace-nowrap align-middle text-xs">{item.hsn || "-"}</td>
                  <td className="px-4 py-3 whitespace-nowrap align-middle text-xs">{item.unit || "-"}</td>
                  <td className="px-4 py-3 whitespace-nowrap align-middle">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="p-1 rounded hover:bg-[var(--color-muted)] transition"
                          aria-label="More actions"
                        >
                          <MoreHorizontal size={16} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-32 p-1">
                        <button
                          className="w-full text-left px-3 py-2 text-xs hover:bg-[var(--color-muted)] rounded transition"
                          onClick={() => openEditModal(item.id)}
                        >
                          Edit
                        </button>
                        {/* Add more actions here if needed */}
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-muted-foreground text-xs">
                    {allItems.length === 0 ? "No items found. Add your first item!" : "No items match your search criteria."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-12 text-xs">
              {allItems.length === 0 ? "No items found. Add your first item!" : "No items match your search criteria."}
            </div>
          )}
          {filteredItems.map((item) => (
            <div key={item.id} className={`relative rounded-md border border-[var(--color-border)] bg-[var(--color-card)] shadow-sm p-4 flex flex-col gap-2 transition hover:shadow-md text-sm ${selectedItems.includes(item.id) ? 'ring-2 ring-[var(--color-primary)]' : ''}`}>
              {/* Checkbox: top-left */}
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  aria-label={`Select item ${item.id}`}
                  className="accent-[var(--color-primary)] w-5 h-5 rounded border-[var(--color-border)]"
                />
              </div>
              {/* Actions: top-right */}
              <div className="absolute top-3 right-3 z-10">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="p-1 rounded hover:bg-[var(--color-muted)] transition"
                      aria-label="More actions"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-32 p-1">
                    <button
                      className="w-full text-left px-3 py-2 text-xs hover:bg-[var(--color-muted)] rounded transition"
                      onClick={() => openEditModal(item.id)}
                    >
                      Edit
                    </button>
                    {/* Add more actions here if needed */}
                  </PopoverContent>
                </Popover>
              </div>
              <div className="pl-8 pr-8">
                <div className="font-mono text-xs text-muted-foreground mb-1">#{item.id}</div>
                <div className="font-medium text-base mb-1 text-[var(--color-foreground)]">{item.name}</div>
                <div className="text-sm text-[var(--color-muted-foreground)] mb-2 truncate">{item.description}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">{item.category || "Uncategorized"}</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">{getSubcategoryName(item.subcategoryId)}</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">{item.type}</span>
                </div>
                <div className="flex items-center gap-3 text-sm mb-2">
                  <span className="font-semibold">₹{item.price.toLocaleString()}</span>
                  <span className="text-xs">HSN: {item.hsn || "-"}</span>
                  <span className="text-xs">Unit: {item.unit || "-"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
