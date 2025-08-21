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
import { IoEye, IoEyeOff } from "react-icons/io5";

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "date" | "text" | "email" | "password";
  required?: boolean;
};

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <FormField
      control={control}
      name={name}
      rules={required ? { required: `${label} is required` } : undefined} // <-- validation
      render={({ field }) => (
        <FormItem>
          <FormLabel className={` text-[14px] font-medium leading-[130%]`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <div className="flex w-full border rounded-md overflow-hidden">
              <input
                {...field}
                type={inputType}
                placeholder={placeholder}
                className={` flex-1 px-4 py-2 outline-none`}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 flex items-center justify-center border-l"
                >
                  {showPassword ? (
                    <IoEyeOff className="text-[#A3A3A3]" size={18} />
                  ) : (
                    <IoEye size={18} className="text-[#A3A3A3]" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
