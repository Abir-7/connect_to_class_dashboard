"use client";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type Option = { label: string; value: string };

interface Props {
  name: string;
  label: string;
  options: Option[];
}

const MultiSelectDropdown: React.FC<Props> = ({ name, label, options }) => {
  const { control, setValue, watch } = useFormContext();
  const selected: string[] = watch(name) || [];

  const [open, setOpen] = useState(false);

  const toggleSelect = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setValue(name, updated);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <div
                className="p-2 border rounded-md cursor-pointer bg-white"
                onClick={() => setOpen((prev) => !prev)}
              >
                {selected.length === 0
                  ? `Select ${label.toLowerCase()}`
                  : `${selected.length} selected`}
              </div>

              {open && (
                <div className="absolute mt-1 w-full border rounded-md bg-white shadow max-h-60 overflow-y-auto z-50">
                  {options.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 accent-blue-500"
                        checked={selected.includes(opt.value)}
                        onChange={() => toggleSelect(opt.value)}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />

          {selected.length > 0 && (
            <div className="mt-2 text-sm text-gray-700">
              <strong>Selected:</strong>
              <ul className="list-disc list-inside">
                {selected.map((val) => {
                  const match = options.find((o) => o.value === val);
                  return <li key={val}>{match?.label || val}</li>;
                })}
              </ul>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default MultiSelectDropdown;
