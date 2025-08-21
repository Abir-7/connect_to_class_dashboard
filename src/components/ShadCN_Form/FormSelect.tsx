"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

type Option = { label: string; value: string };

type FormSelectProps = {
  name: string;
  label: string;
  options: Option[];
};

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <select {...field} className="w-full p-2 border rounded-md">
              <option value="" disabled>
                Select {label.toLowerCase()}
              </option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
