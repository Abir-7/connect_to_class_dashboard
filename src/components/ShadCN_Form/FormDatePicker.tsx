"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { format, isDate, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FormDatePickerProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
};

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  name,
  label,
  required = false,
  placeholder = "Pick a date",
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} is required` } : undefined}
      render={({ field, fieldState }) => {
        const valueAsDate =
          field.value && !isDate(field.value)
            ? parseISO(field.value)
            : field.value;

        return (
          <FormItem className="flex flex-col">
            <FormLabel className="text-[#272727] text-[16px] font-medium leading-[130%]">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
            <FormControl>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !field.value ? "text-muted-foreground" : ""
                    }`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {valueAsDate ? (
                      format(valueAsDate, "PPP")
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={valueAsDate}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormControl>
            {fieldState.error && (
              <FormMessage>{fieldState.error.message}</FormMessage>
            )}
          </FormItem>
        );
      }}
    />
  );
};
