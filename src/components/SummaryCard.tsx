import React from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export type SummaryCardProps = {
  subtotal: number;
  discountType: string;
  discountValue: number;
  setDiscountType: React.Dispatch<React.SetStateAction<string>>;
  setDiscountValue: React.Dispatch<React.SetStateAction<number>>;
  tax: number;
  shipping: number;
  setShipping: React.Dispatch<React.SetStateAction<number>>;
  roundOff: boolean;
  setRoundOff: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
};

const SummaryCard: React.FC<SummaryCardProps> = ({ subtotal, discountType, discountValue, setDiscountType, setDiscountValue, tax, shipping, setShipping, roundOff, setRoundOff, total }) => {
  return (
    <Card className="bg-white rounded-xl shadow p-4 mb-6 ml-auto">
      <div className="flex justify-between mb-1">
        <span>Subtotal</span>
        <span className="font-mono">{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between mb-1">
        <span>Discount</span>
        <span className="flex items-center">
          <Select onValueChange={setDiscountType} value={discountType}>
            <SelectTrigger className="w-[80px] mr-2 h-8 text-xs">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flat">Flat</SelectItem>
              <SelectItem value="percent">%</SelectItem>
            </SelectContent>
          </Select>
          <Input type="number" className="input w-16 h-8 text-xs" value={discountValue} min={0} onChange={e => setDiscountValue(Number(e.target.value))} />
        </span>
      </div>
      <div className="flex justify-between mb-1">
        <span>Tax</span>
        <span className="font-mono">{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-1">
        <span>Shipping/Extra</span>
        <Input type="number" className="input w-16 h-8 text-xs text-right" value={shipping} min={0} onChange={e => setShipping(Number(e.target.value))} />
      </div>
      <div className="flex items-center justify-between mb-1">
        <span>Round-Off</span>
        <Checkbox checked={roundOff} onCheckedChange={() => setRoundOff(v => !v)} />
      </div>
      <div className="flex justify-between items-center mt-2 border-t pt-2">
        <span className="text-base font-bold">Total</span>
        <span className="text-xl font-extrabold text-[var-primary-foreground] font-mono">{total.toFixed(2)}</span>
      </div>
    </Card>
  );
};

export default SummaryCard; 