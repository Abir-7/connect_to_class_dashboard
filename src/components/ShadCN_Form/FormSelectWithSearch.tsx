"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Option = { label: string; value: string };

type FormSearchableSelectProps = {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
};

export const FormSelectWithSearch: React.FC<FormSearchableSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  required = false,
}) => {
  const { control } = useFormContext();
  const [search, setSearch] = React.useState("");

  // Filter options by search term
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} is required` } : undefined}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-[#272727] text-[16px] font-medium leading-[130%]">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={placeholder || `Select ${label.toLowerCase()}`}
                />
              </SelectTrigger>
              <SelectContent>
                {/* Search bar inside dropdown */}
                <div className="p-2">
                  <Input
                    placeholder={`Search ${label.toLowerCase()}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-muted-foreground">
                    No results found.
                  </div>
                )}
              </SelectContent>
            </Select>
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
