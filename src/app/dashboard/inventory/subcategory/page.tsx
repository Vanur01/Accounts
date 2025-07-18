"use client";
import { useSearchParams } from "next/navigation";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useSubcategoryStore } from "@/stores/useSubcategoryStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function SubcategoriesPage() {
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get("categoryId"));
  const { categories } = useCategoryStore();
  const parentCategory = categories.find((cat) => cat.id === categoryId);
  const { subcategories, addSubcategory, editSubcategory, deleteSubcategory } = useSubcategoryStore();
  const filteredSubcategories = useMemo(() => subcategories.filter((sub) => sub.categoryId === categoryId), [subcategories, categoryId]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Open modal for create or edit
  const openModal = (subcategory?: { id: number; name: string; description?: string }) => {
    if (subcategory) {
      setEditId(subcategory.id);
      setName(subcategory.name);
      setDescription(subcategory.description || "");
    } else {
      setEditId(null);
      setName("");
      setDescription("");
    }
    setModalOpen(true);
  };

  // Handle create or edit
  const handleSave = () => {
    if (name.trim() === "") return;
    if (editId !== null) {
      editSubcategory(editId, name.trim(), description.trim());
    } else {
      addSubcategory(name.trim(), description.trim(), categoryId);
    }
    setModalOpen(false);
    setName("");
    setDescription("");
    setEditId(null);
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteId !== null) {
      deleteSubcategory(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <Link href="/dashboard/inventory/catagory" className="text-muted-foreground hover:text-primary underline text-sm">&larr; Back to Categories</Link>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Subcategories</h1>
          {parentCategory && (
            <div className="text-muted-foreground text-sm">for Category: <span className="font-semibold">{parentCategory.name}</span></div>
          )}
        </div>
        <Button onClick={() => openModal()}>Add Subcategory</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 font-semibold">Name</th>
              <th className="py-2 px-4 font-semibold">Description</th>
              <th className="py-2 px-4 font-semibold">No. of Items</th>
              <th className="py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  No subcategories yet. Add your first subcategory!
                </td>
              </tr>
            ) : (
              filteredSubcategories.map((sub) => (
                <tr key={sub.id} className="border-t">
                  <td className="py-2 px-4">
                    <Link href={`/dashboard/inventory/items?subcategoryId=${sub.id}`} className="text-primary underline hover:opacity-80">
                      {sub.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{sub.description || <span className="text-gray-400">—</span>}</td>
                  <td className="py-2 px-4 text-center">0</td>
                  <td className="py-2 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openModal(sub)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteId(sub.id)} className="text-red-600 focus:text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Create/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId !== null ? "Edit Subcategory" : "Add Subcategory"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              autoFocus
              placeholder="Subcategory name"
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSave(); }}
            />
            <Input
              placeholder="Description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") handleSave(); }}
            />
          </div>
          <DialogFooter>
            <Button onClick={() => setModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={handleSave}>{editId !== null ? "Save" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteId !== null} onOpenChange={open => { if (!open) setDeleteId(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Subcategory</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete this subcategory?</div>
          <DialogFooter>
            <Button onClick={() => setDeleteId(null)} variant="outline">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
