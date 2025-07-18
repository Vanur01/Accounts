import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export type InvoiceHeaderBarProps = {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invoiceNumber: string;
  date: string;
  onDateChange: (date: string) => void;
  dueDate: string;
  onDueDateChange: (date: string) => void;
};

const InvoiceHeaderBar: React.FC<InvoiceHeaderBarProps> = ({ title, onTitleChange, invoiceNumber, date, onDateChange, dueDate, onDueDateChange }) => {
  return (
    <section className="sticky top-0 z-10 mb-6 pb-4 flex flex-col md:flex-row md:items-end gap-6 px-2">
      <div className="flex-1">
        <label className="block text-xs font-semibold mb-1 text-gray-500">Invoice Title</label>
        <Input type="text" value={title} onChange={onTitleChange} />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Invoice Number</label>
        <Input type="text" value={invoiceNumber} readOnly />
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[180px] justify-start text-left font-normal"
              onClick={() => onDateChange(date)}
            >
              {date ? format(new Date(date), "yyyy-MM-dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date ? new Date(date) : undefined}
              onSelect={(newDate) => {
                if (newDate) {
                  onDateChange(format(newDate, "yyyy-MM-dd"));
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <label className="block text-xs font-semibold mb-1 text-gray-500">Due Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[180px] justify-start text-left font-normal"
              onClick={() => onDueDateChange(dueDate)}
            >
              {dueDate ? format(new Date(dueDate), "yyyy-MM-dd") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dueDate ? new Date(dueDate) : undefined}
              onSelect={(newDate) => {
                if (newDate) {
                  onDueDateChange(format(newDate, "yyyy-MM-dd"));
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </section>
  );
};

export default InvoiceHeaderBar;
