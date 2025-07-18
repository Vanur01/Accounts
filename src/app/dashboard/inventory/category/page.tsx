"use client";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function CategoriesPage() {
  const { categories, addCategory, editCategory, deleteCategory } = useCategoryStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Open modal for create or edit
  const openModal = (category?: { id: number; name: string; description?: string }) => {
    if (category) {
      setEditId(category.id);
      setName(category.name);
      setDescription(category.description || "");
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
      editCategory(editId, name.trim(), description.trim());
    } else {
      addCategory(name.trim(), description.trim());
    }
    setModalOpen(false);
    setName("");
    setDescription("");
    setEditId(null);
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteId !== null) {
      deleteCategory(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={() => openModal()}>Add Category</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 font-semibold">Name</th>
              <th className="py-2 px-4 font-semibold">Description</th>
              <th className="py-2 px-4 font-semibold">No. of Subcategories</th>
              <th className="py-2 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  No categories yet. Add your first category!
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="border-t">
                  <td className="py-2 px-4">
                    <Link href={`/dashboard/inventory/subcategory?categoryId=${cat.id}`} className="text-primary underline hover:opacity-80">
                      {cat.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4">{cat.description || <span className="text-gray-400">—</span>}</td>
                  <td className="py-2 px-4 text-center">0</td>
                  <td className="py-2 px-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openModal(cat)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setDeleteId(cat.id)} className="text-red-600 focus:text-red-600">
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
            <DialogTitle>{editId !== null ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              autoFocus
              placeholder="Category name"
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
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <div>Are you sure you want to delete this category?</div>
          <DialogFooter>
            <Button onClick={() => setDeleteId(null)} variant="outline">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
