"use client";

import React, { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

// ----------------- FormInput -----------------
type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
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
            <div className="relative w-full">
              <Input
                {...field}
                type={inputType}
                placeholder={placeholder}
                className={type === "password" ? "pr-10" : ""}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center"
                >
                  {showPassword ? (
                    <IoEyeOff className="text-[#A3A3A3]" size={18} />
                  ) : (
                    <IoEye className="text-[#A3A3A3]" size={18} />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

// ----------------- FormTextarea -----------------
type FormTextareaProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  label,
  placeholder,
  required = false,
}) => {
  const { control } = useFormContext();

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
            <Textarea {...field} placeholder={placeholder} />
          </FormControl>

          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
