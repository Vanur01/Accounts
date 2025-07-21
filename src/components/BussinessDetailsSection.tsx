import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBussinessStore } from "@/stores/useBussinessStore";
import AddBussinessModal from "@/components/AddBussinessModal";

export type BusinessDetails = {
  name: string;
  gstin: string;
  address: string;
  contact: string;
  email: string;
};

export type YourDetailsSectionProps = {
  businessId?: string;
  onBusinessSelect?: (value: string) => void;
  showAddBusiness?: boolean;
  setShowAddBusiness?: React.Dispatch<React.SetStateAction<boolean>>;
  businessDetails: BusinessDetails;
  setBusinessDetails?: React.Dispatch<React.SetStateAction<BusinessDetails>>;
  handleAddBusiness?: () => void;
  mockBusinesses?: { id: number; name: string; gstin: string; address: string; contact: string; email: string }[];
  hideSelector?: boolean;
};

const YourDetailsSection: React.FC<YourDetailsSectionProps> = (props) => {
  const businessStoreDetails = useBussinessStore((s) => s.details);
  // Prefer prop, fallback to store
  const businessDetails = props.businessDetails || (businessStoreDetails ? {
    name: businessStoreDetails.businessName,
    gstin: businessStoreDetails.gstNumber || "",
    address: businessStoreDetails.website || "",
    contact: businessStoreDetails.phone,
    email: "",
  } : undefined);
  const [businessSearch, setBusinessSearch] = useState("");
  const filteredBusinesses = props.mockBusinesses?.filter(b =>
    b.name.toLowerCase().includes(businessSearch.toLowerCase())
  ) || [];
  const [editOpen, setEditOpen] = useState(false);
  return (
    <Card className="bg-white rounded-xl shadow p-6 mb-6 relative">
      {businessStoreDetails && (
        <>
          <button
            className="absolute top-4 right-4 text-xs px-3 py-1 rounded border border-gray-300 bg-white hover:bg-gray-100 transition"
            onClick={() => setEditOpen(true)}
          >
            Edit
          </button>
          <AddBussinessModal open={editOpen} setOpen={setEditOpen} initialValues={businessStoreDetails} />
        </>
      )}
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Your Business Details</h2>
      {!props.hideSelector && (
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1 text-gray-500">Select Business</label>
            <Select onValueChange={props.onBusinessSelect!} value={props.businessId}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="-- Select Business --" />
              </SelectTrigger>
              <SelectContent>
                <div className="px-2 py-1">
                  <Input
                    placeholder="Search business..."
                    value={businessSearch}
                    onChange={e => setBusinessSearch(e.target.value)}
                    className="mb-2 w-full"
                    onKeyDown={e => e.stopPropagation()}
                  />
                </div>
                {filteredBusinesses.map(b => <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>)}
                <SelectItem value="new">+ Add New Business</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {props.businessId === "new" && props.setShowAddBusiness && (
            <Button className="btn btn-primary font-semibold px-6 py-2 rounded shadow border border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100 transition" onClick={() => props.setShowAddBusiness!(true)}>
              + Add New Business
            </Button>
          )}
        </div>
      )}
      {/* Remove old inline add business UI, modal will be used instead */}
      {businessDetails && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">Company Name</div>
            <div className="font-medium text-base">{businessDetails.name}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">GSTIN</div>
            <div className="font-medium text-base">{businessDetails.gstin}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Billing Address</div>
            <div className="font-medium text-base">{businessDetails.address}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Contact Person</div>
            <div className="font-medium text-base">{businessDetails.contact}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Email</div>
            <div className="font-medium text-base">{businessDetails.email}</div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default YourDetailsSection; 