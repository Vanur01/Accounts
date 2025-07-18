import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { IoCloseCircle } from "react-icons/io5";
import ConfigureTax from "@/components/ConfigureTax";
import type { Cess } from "@/components/ConfigureTax";

export type Item = {
  name: string;
  description: string;
  qty: number;
  rate: number;
  discount: number;
  igst?: number;
  sgst?: number;
  cgst?: number;
  amount: number;
  hsn: string;
  unit: string;
  [key: string]: any; // for dynamic cess fields
};

export type ItemTableProps = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  handleItemChange: (idx: number, field: string, value: any) => void;
  handleAddItem: () => void;
  handleRemoveItem: (idx: number) => void;
  showHSN: boolean;
  setShowHSN: React.Dispatch<React.SetStateAction<boolean>>;
  showUnit: boolean;
  setShowUnit: React.Dispatch<React.SetStateAction<boolean>>;
  onAddNewItemClick: () => void;
  openBulkModal: () => void;
  taxType: string;
  cessList: Cess[];
  setTaxType: React.Dispatch<React.SetStateAction<string>>;
  setCessList: React.Dispatch<React.SetStateAction<Cess[]>>;
  mockProducts: {
    id: number;
    name: string;
    price: number;
    type: string;
    description?: string;
    hsn?: string;
    unit?: string;
    igst?: number;
    sgst?: number;
    cgst?: number;
  }[];
};

const ItemTable: React.FC<ItemTableProps & { taxType: string; cessList: Cess[] }> = ({ items, setItems, handleItemChange, handleAddItem, handleRemoveItem, showHSN, setShowHSN, showUnit, setShowUnit, onAddNewItemClick, openBulkModal, taxType, cessList, ...props }) => {
  const [itemSearch, setItemSearch] = useState("");
  const filteredProducts = props.mockProducts.filter(p =>
    p.name.toLowerCase().includes(itemSearch.toLowerCase())
  );
  const options = [
    ...filteredProducts.map(p => ({ value: p.name, label: p.name })),
    { value: "__add_new_item__", label: "+ Add New Item" }
  ];
  const [rowOpen, setRowOpen] = useState<{ [idx: number]: boolean }>({});
  const [rowSearch, setRowSearch] = useState<{ [idx: number]: string }>({});

  const handleProductSelect = (idx: number, product: any) => {
    setItems((prev: any[]) => {
      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        name: product.name,
        rate: product.price ?? 0,
        description: product.description ?? "",
        hsn: product.hsn ?? "",
        unit: product.unit ?? "",
        igst: product.igst ?? 0,
        sgst: product.sgst ?? 0,
        cgst: product.cgst ?? 0,
      };
      return updated;
    });
  };
  return (
    <Card className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-2 flex-wrap">
        <h2 className="text-lg font-semibold">Items</h2>
        <div className="flex gap-3 items-center flex-wrap ml-auto">
          <label className="flex items-center gap-1 text-xs">
            <Checkbox checked={showHSN} onCheckedChange={checked => setShowHSN(checked === true)} /> HSN/SAC
          </label>
          <label className="flex items-center gap-1 text-xs">
            <Checkbox checked={showUnit} onCheckedChange={checked => setShowUnit(checked === true)} /> Unit
          </label>
          <ConfigureTax taxType={taxType} setTaxType={props.setTaxType} cessList={cessList} setCessList={props.setCessList} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-2">Item Details</th>
              <th className="px-2 py-2">Qty</th>
              <th className="px-2 py-2">Rate</th>
              <th className="px-2 py-2">Discount</th>
              {taxType === "IGST" && <th className="px-2 py-2">IGST (%)</th>}
              {taxType === "SGST_CGST" && <>
                <th className="px-2 py-2">SGST (%)</th>
                <th className="px-2 py-2">CGST (%)</th>
              </>}
              {cessList.filter(c => c.showInInvoice).map((cess, i) => (
                <th className="px-2 py-2" key={i}>{cess.name || "Cess"}</th>
              ))}
              {showHSN && <th className="px-2 py-2">HSN/SAC</th>}
              {showUnit && <th className="px-2 py-2">Unit</th>}
              <th className="px-2 py-2">Amount</th>
              <th className="px-2 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="even:bg-gray-50 hover:bg-blue-50 transition">
                <td className="px-2 py-1">
                  <Popover open={!!rowOpen[idx]} onOpenChange={open => setRowOpen(o => ({ ...o, [idx]: open }))}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={rowOpen[idx]}
                        className="w-48 justify-between"
                      >
                        {item.name
                          ? options.find(opt => opt.value === item.name)?.label || item.name // fallback to item.name
                          : "Select or add item"}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search item..."
                          value={rowSearch[idx] || ""}
                          onValueChange={val => setRowSearch(s => ({ ...s, [idx]: val }))}
                        />
                        <CommandList>
                          <CommandEmpty>No item found.</CommandEmpty>
                          <CommandGroup>
                            {options.map(option => (
                              <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={currentValue => {
                                  setRowSearch(s => ({ ...s, [idx]: "" }));
                                  setRowOpen(o => ({ ...o, [idx]: false }));
                                  if (currentValue === "__add_new_item__") {
                                    onAddNewItemClick();
                                  } else {
                                    const selectedProduct = props.mockProducts.find(p => p.name === currentValue);
                                    if (selectedProduct) {
                                      handleProductSelect(idx, selectedProduct);
                                    } else {
                                      handleItemChange(idx, "name", currentValue);
                                    }
                                  }
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    item.name === option.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {option.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </td>
                <td className="px-2 py-1">
                  <Input type="number" className="input w-16" value={item.qty} min={1} onChange={e => handleItemChange(idx, "qty", e.target.value)} />
                </td>
                <td className="px-2 py-1">
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">₹</span>
                    <Input type="number" className="input w-20" value={item.rate} min={0} onChange={e => handleItemChange(idx, "rate", e.target.value)} />
                  </div>
                </td>
                <td className="px-2 py-1">
                  <div className="flex items-center">
                    <Input type="number" className="input w-16" value={item.discount} min={0} onChange={e => handleItemChange(idx, "discount", e.target.value)} />
                    <span className="text-gray-400 ml-1">₹</span>
                  </div>
                </td>
                {taxType === "IGST" && (
                  <td className="px-2 py-1">
                    <Input type="number" className="input w-16" value={item.igst ?? 0} min={0} onChange={e => handleItemChange(idx, "igst", Number(e.target.value))} />
                  </td>
                )}
                {taxType === "SGST_CGST" && (
                  <>
                    <td className="px-2 py-1">
                      <Input type="number" className="input w-16" value={item.sgst ?? 0} min={0} onChange={e => handleItemChange(idx, "sgst", Number(e.target.value))} />
                    </td>
                    <td className="px-2 py-1">
                      <Input type="number" className="input w-16" value={item.cgst ?? 0} min={0} onChange={e => handleItemChange(idx, "cgst", Number(e.target.value))} />
                    </td>
                  </>
                )}
                {cessList.filter(c => c.showInInvoice).map((cess, i) => (
                  <td className="px-2 py-1" key={i}>
                    <Input type="number" className="input w-16" value={item[cess.name] ?? 0} min={0} onChange={e => handleItemChange(idx, cess.name, Number(e.target.value))} />
                  </td>
                ))}
                {showHSN && (
                  <td className="px-2 py-1">
                    <Input className="input w-20" value={item.hsn} onChange={e => handleItemChange(idx, "hsn", e.target.value)} />
                  </td>
                )}
                {showUnit && (
                  <td className="px-2 py-1">
                    <Input className="input w-16" value={item.unit} onChange={e => handleItemChange(idx, "unit", e.target.value)} />
                  </td>
                )}
                <td className="px-2 py-1 font-mono">{item.amount.toFixed(2)}</td>
                <td className="px-2 py-1">
                  {items.length > 1 && (
                    <Button className="text-black-500 hover:text-red-500 text-lg" variant="ghost" onClick={() => handleRemoveItem(idx)}>
                      <IoCloseCircle />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2 mt-4">
        <Button className="btn btn-outline" onClick={handleAddItem}>+ Add New Row</Button>
        <Button className="btn btn-outline" type="button" onClick={openBulkModal}>+ Add Items in Bulk</Button>
      </div>
      {/* Removed separate '+ Add New Item' button */}
    </Card>
  );
};

export default ItemTable; 