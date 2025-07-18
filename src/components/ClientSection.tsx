import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export type ClientDetails = {
  name: string;
  gstin: string;
  address: string;
  contact: string;
  email: string;
};

export type ClientSectionProps = {
  clientId: string;
  onClientSelect: (value: string) => void;
  showAddClient: boolean;
  setShowAddClient: React.Dispatch<React.SetStateAction<boolean>>;
  clientDetails: ClientDetails;
  setClientDetails: React.Dispatch<React.SetStateAction<ClientDetails>>;
  handleAddClient: () => void;
  mockClients: { id: number; name: string; gstin: string; address: string; contact: string; email: string }[];
};

const ClientSection: React.FC<ClientSectionProps> = ({ clientId, onClientSelect, showAddClient, setShowAddClient, clientDetails, setClientDetails, handleAddClient, mockClients }) => {
  const [clientSearch, setClientSearch] = useState("");
  const filteredClients = mockClients.filter(c =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase())
  );
  return (
    <Card className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Client Details</h2>
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold mb-1 text-gray-500">Select Client</label>
          <Select onValueChange={onClientSelect} value={clientId}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="-- Select Client --" />
            </SelectTrigger>
            <SelectContent>
              <div className="px-2 py-1">
                <Input
                  placeholder="Search client..."
                  value={clientSearch}
                  onChange={e => setClientSearch(e.target.value)}
                  className="mb-2 w-full"
                  onKeyDown={e => e.stopPropagation()}
                />
              </div>
              {filteredClients.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
              <SelectItem value="new">+ Add New Client</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {clientId === "new" && (
          <Button className="btn btn-primary font-semibold px-6 py-2 rounded shadow border border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100 transition" onClick={() => setShowAddClient(true)}>
            + Add New Client
          </Button>
        )}
      </div>
      {/* Remove old inline add client UI, modal will be used instead */}
      {clientId && clientId !== "new" && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">Company Name</div>
            <div className="font-medium text-base">{clientDetails.name}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">GSTIN</div>
            <div className="font-medium text-base">{clientDetails.gstin}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Billing Address</div>
            <div className="font-medium text-base">{clientDetails.address}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Contact Person</div>
            <div className="font-medium text-base">{clientDetails.contact}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Email</div>
            <div className="font-medium text-base">{clientDetails.email}</div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ClientSection; 