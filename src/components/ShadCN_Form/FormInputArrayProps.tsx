"use client";
import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  FormLabel,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FieldDefinition = {
  name: string;
  label: string;
  type?: "text" | "number" | "select" | "date";
  placeholder?: string;
  options?: { label: string; value: string }[]; // for selects
};

type FormInputArrayProps = {
  name: string;
  label: string;
  fields: FieldDefinition[];
};

export const FormInputArray: React.FC<FormInputArrayProps> = ({
  name,
  label,
  fields,
}) => {
  const { control, register } = useFormContext();
  const {
    fields: arrayFields,
    append,
    remove,
  } = useFieldArray({ control, name });

  return (
    <div className="space-y-4">
      <FormLabel className="text-lg font-medium">{label}</FormLabel>

      {arrayFields.map((item, index) => (
        <div
          key={item.id}
          className="flex gap-2 border p-2 rounded-lg flex-wrap"
        >
          {fields.map((fieldDef) => (
            <FormItem className="flex-1 min-w-[150px]" key={fieldDef.name}>
              <FormLabel>{fieldDef.label}</FormLabel>
              <FormControl>
                {fieldDef.type === "select" ? (
                  <select
                    {...register(`${name}.${index}.${fieldDef.name}`)}
                    className="w-full py-[5.5px] text-sm p-2 appearance-none border rounded-md"
                  >
                    <option value="">Select {fieldDef.label}</option>
                    {fieldDef.options?.map((opt) => (
                      <option
                        className="text-black"
                        key={opt.value}
                        value={opt.value}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    type={fieldDef.type || "text"}
                    placeholder={fieldDef.placeholder}
                    {...register(`${name}.${index}.${fieldDef.name}`)}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          ))}

          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
            disabled={arrayFields.length === 1}
          >
            -
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append(
            Object.fromEntries(fields.map((f) => [f.name, ""])) // init empty
          )
        }
        className="w-full"
      >
        + Add {label.slice(0, -1)}
      </Button>
    </div>
  );
};
