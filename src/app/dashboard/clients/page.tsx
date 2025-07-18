"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import AddClientModal, { AddClientForm } from "@/components/AddClientModal";
import { useClientStore, Client } from "@/stores/useClientStore";

export default function ClientsPage() {
  const clients = useClientStore((state) => state.clients);
  const addClient = useClientStore((state) => state.addClient);
  const updateClient = useClientStore((state) => state.updateClient);
  const [addClientModalOpen, setAddClientModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleAddClient = (data: AddClientForm) => {
    addClient({
      name: data.businessName,
      gstin: data.gstin,
      address: data.street,
      contact: data.alias || data.businessName,
      email: data.email,
    });
    setAddClientModalOpen(false);
  };

  const handleEditClient = (data: AddClientForm & { id?: number }) => {
    if (editingClient) {
      updateClient(editingClient.id, {
        name: data.businessName,
        gstin: data.gstin,
        address: data.street,
        contact: data.alias || data.businessName,
        email: data.email,
      });
      setEditingClient(null);
      setAddClientModalOpen(false);
    }
  };

  const openEditModal = (client: Client) => {
    setEditingClient(client);
    setAddClientModalOpen(true);
  };

  const handleModalClose = () => {
    setAddClientModalOpen(false);
    setEditingClient(null);
  };

  return (
    <div className="max-w-5xl mx-auto rounded-lg shadow p-8 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Button onClick={() => setAddClientModalOpen(true)} className="btn btn-primary">
          + New Client
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GSTIN</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="px-6 py-4 whitespace-nowrap font-mono">{client.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.gstin}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.contact}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button size="sm" variant="outline" onClick={() => openEditModal(client)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-400">No clients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddClientModal
        open={addClientModalOpen}
        onClose={handleModalClose}
        onSubmit={editingClient ? handleEditClient : handleAddClient}
        initialValues={editingClient ? {
          id: editingClient.id,
          businessName: editingClient.name,
          gstin: editingClient.gstin,
          street: editingClient.address,
          alias: editingClient.contact,
          email: editingClient.email,
        } : undefined}
        mode={editingClient ? 'edit' : 'add'}
      />
    </div>
  );
}
