import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { IoClose } from "react-icons/io5";

export type PaymentPhase = {
  name: string;
  dueDate: string;
  amount: number;
};

type PhaseWisePaymentProps = {
  phases: PaymentPhase[];
  setPhases: React.Dispatch<React.SetStateAction<PaymentPhase[]>>;
  totalAmount: number;
};

export default function PhaseWisePayment({ phases, setPhases, totalAmount }: PhaseWisePaymentProps) {
  const [error, setError] = React.useState("");

  const handlePhaseChange = (idx: number, field: keyof PaymentPhase, value: any) => {
    setPhases(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleAddPhase = () => {
    setPhases(prev => [
      ...prev,
      { name: "", dueDate: "", amount: 0 },
    ]);
  };

  const handleRemovePhase = (idx: number) => {
    setPhases(prev => prev.filter((_, i) => i !== idx));
  };

  React.useEffect(() => {
    const sum = phases.reduce((acc, p) => acc + Number(p.amount), 0);
    if (sum > totalAmount) {
      setError("Total of all phases exceeds quotation total.");
    } else {
      setError("");
    }
  }, [phases, totalAmount]);

  return (
    <Card className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Phase-wise Payment</h2>
      {phases.map((phase, idx) => (
        <div key={idx} className="flex flex-col md:flex-row gap-4 items-end mb-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold mb-1 text-gray-500">Phase Name/Description</label>
            <Input
              type="text"
              value={phase.name}
              onChange={e => handlePhaseChange(idx, "name", e.target.value)}
              placeholder={`Phase ${idx + 1}`}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-500">Due Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[150px] justify-start text-left font-normal"
                >
                  {phase.dueDate ? format(new Date(phase.dueDate), "yyyy-MM-dd") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={phase.dueDate ? new Date(phase.dueDate) : undefined}
                  onSelect={newDate => {
                    if (newDate) {
                      handlePhaseChange(idx, "dueDate", format(newDate, "yyyy-MM-dd"));
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-500">Amount</label>
            <Input
              type="number"
              min={0}
              value={phase.amount}
              onChange={e => handlePhaseChange(idx, "amount", Number(e.target.value))}
              className="w-24"
            />
          </div>
          <div>
            <Button
              type="button"
              variant="ghost"
              className="text-black-500 hover:text-red-500 text-lg"
              onClick={() => handleRemovePhase(idx)}
              disabled={phases.length === 1}
              title="Remove phase"
            >
              <IoClose />
            </Button>
          </div>
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <Button type="button" variant="outline" onClick={handleAddPhase}>+ Add Phase</Button>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <span className="font-semibold">Total of all phases:</span> {phases.reduce((acc, p) => acc + Number(p.amount), 0).toFixed(2)} / {totalAmount.toFixed(2)}
      </div>
      {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
    </Card>
  );
}
