"use client";

import React from "react";
import {
  useForm,
  FormProvider,
  UseFormProps,
  FieldValues,
} from "react-hook-form";

type BaseFormProps<T extends FieldValues> = {
  defaultValues: UseFormProps<T>["defaultValues"];
  onSubmit: (data: T, reset: () => void) => void;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  btnText?: string;
};

export function BaseForm<T extends FieldValues>({
  defaultValues,
  onSubmit,
  children,
  className = "",
}: BaseFormProps<T>) {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => onSubmit(data, methods.reset))}
        className={`space-y-6  ${className}`}
      >
        {children}
      </form>
    </FormProvider>
  );
}
