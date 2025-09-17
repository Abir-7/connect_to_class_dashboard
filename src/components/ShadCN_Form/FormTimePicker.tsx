"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Clock } from "lucide-react";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type FormTimePickerProps = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  interval?: number; // minutes step (default 30)
};

export const FormTimePicker: React.FC<FormTimePickerProps> = ({
  name,
  label,
  required = false,
  placeholder = "Pick a time",
  interval = 30,
}) => {
  const { control } = useFormContext();

  // Generate 12h format times
  const timeOptions = React.useMemo(() => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += interval) {
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        const minute = String(m).padStart(2, "0");
        const ampm = h < 12 ? "AM" : "PM";
        times.push(`${hour12}:${minute} ${ampm}`);
      }
    }
    return times;
  }, [interval]);

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} is required` } : undefined}
      render={({ field, fieldState }) => (
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
                  <Clock className="mr-2 h-4 w-4" />
                  {field.value ? field.value : <span>{placeholder}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search time..." />
                  <CommandList>
                    <CommandEmpty>No time found.</CommandEmpty>
                    <CommandGroup>
                      {timeOptions.map((time) => (
                        <CommandItem
                          key={time}
                          value={time}
                          onSelect={() => field.onChange(time)}
                        >
                          {time}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
