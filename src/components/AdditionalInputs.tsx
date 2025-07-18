import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IoClose } from "react-icons/io5";
import SignaturePad from "@/components/SignaturePad";

export type AdditionalInputsProps = {
  terms: string;
  setTerms: React.Dispatch<React.SetStateAction<string>>;
  notes: string;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  attachments: File[];
  handleAttachment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSignature: boolean;
  setShowSignature: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdditionalInputs: React.FC<AdditionalInputsProps> = ({ terms, setTerms, notes, setNotes, attachments, handleAttachment, showSignature, setShowSignature }) => {
  const [signatureMode, setSignatureMode] = useState<'none' | 'upload' | 'pad'>('none');
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signaturePadData, setSignaturePadData] = useState<string | null>(null);
  const [signaturePadModalOpen, setSignaturePadModalOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(!!terms);
  const [showNotes, setShowNotes] = useState(!!notes);

  // Hide field if cleared
  React.useEffect(() => { if (!terms) setShowTerms(false); }, [terms]);
  React.useEffect(() => { if (!notes) setShowNotes(false); }, [notes]);

  return (
    <Card className="bg-white rounded-xl shadow p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Terms & Conditions</label>
        {showTerms ? (
          <div className="relative">
            <Textarea className="input pr-8" rows={3} value={terms} onChange={e => setTerms(e.target.value)} />
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => { setTerms(""); setShowTerms(false); }}
              aria-label="Close"
            >
              <IoClose size={18} />
            </button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setShowTerms(true)}>
            + Add Terms & Conditions
          </Button>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Notes to Client</label>
        {showNotes ? (
          <div className="relative">
            <Textarea className="input pr-8" rows={3} value={notes} onChange={e => setNotes(e.target.value)} />
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => { setNotes(""); setShowNotes(false); }}
              aria-label="Close"
            >
              <IoClose size={18} />
            </button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setShowNotes(true)}>
            + Add Notes to Client
          </Button>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Attachment Upload</label>
        <Input type="file" className="input" multiple onChange={handleAttachment} />
        {attachments.length > 0 && (
          <ul className="mt-2 text-xs text-gray-600">
            {attachments.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <span className="font-semibold text-sm mb-1">Signature Block</span>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="signatureMode"
              value="upload"
              checked={signatureMode === 'upload'}
              onChange={() => setSignatureMode('upload')}
            />
            Upload Signature
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="signatureMode"
              value="pad"
              checked={signatureMode === 'pad'}
              onChange={() => setSignatureMode('pad')}
            />
            Use Signature Pad
          </label>
        </div>
        {signatureMode === 'upload' && (
          <div className="mt-2">
            <Input type="file" accept="image/*" onChange={e => setSignatureFile(e.target.files?.[0] || null)} />
            {signatureFile && (
              <>
                <div className="mt-2 text-xs text-gray-600">Selected: {signatureFile.name}</div>
                <div className="mt-4">
                  <span className="block text-xs text-gray-500 mb-1">Signature Preview:</span>
                  <img
                    src={URL.createObjectURL(signatureFile)}
                    alt="Signature preview"
                    className="border rounded h-40"
                  />
                  <Button type="button" size="sm" variant="outline" className="mt-2" onClick={() => setSignatureFile(null)}>
                    Reset
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
        {signatureMode === 'pad' && (
          <div className="mt-2">
            {signaturePadData && (
              <div className="mb-4">
                <span className="block text-xs text-gray-500 mb-1">Signature Preview:</span>
                <img src={signaturePadData} alt="Signature preview" className="border rounded h-40" />
              </div>
            )}
            <div className="flex gap-2 items-center">
              <Button type="button" className="btn btn-outline" onClick={() => setSignaturePadModalOpen(true)}>
                Sign
              </Button>
              {signaturePadData && (
                <Button type="button" size="sm" variant="outline" onClick={() => setSignaturePadData(null)}>
                  Reset
                </Button>
              )}
            </div>
            <Dialog open={signaturePadModalOpen} onOpenChange={setSignaturePadModalOpen}>
              <DialogContent className="max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Draw Signature</DialogTitle>
                </DialogHeader>
                <SignaturePad
                  onSave={data => {
                    setSignaturePadData(data);
                    setSignaturePadModalOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AdditionalInputs; 