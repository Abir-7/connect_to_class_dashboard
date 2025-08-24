/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx or pages/index.tsx
"use client";

import { useState } from "react";

import { RichTextEditorDemo } from "./_components/TextEditor";
import { BaseForm } from "@/components/ShadCN_Form/BaseForm";
import { FormInput } from "@/components/ShadCN_Form/FormInput";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const [editorHtml, setEditorHtml] = useState("");
  const onSubmit = async (data: any) => {
    console.log({ ...data, editorHtml });
  };
  return (
    <div className="p-4 space-y-4">
      <BaseForm onSubmit={onSubmit} defaultValues={{ title: "" }}>
        <FormInput
          name="title"
          label="Policy Title"
          placeholder="Title"
        ></FormInput>

        <RichTextEditorDemo onChange={setEditorHtml} />

        <Button className=" h-[40px] bg-transparent hover:bg-transparent  transition-all duration-300  active:text-[#ffffff] active:bg-[#359AB1] hover:border-solid text-[#359AB1] border-[#359AB1] border py-2 w-full  text-[14px] font-semibold  border-dashed">
          Add Policy <Plus className="font-bold" size={15}></Plus>
        </Button>
      </BaseForm>

      {/* Live preview */}
      <div className="mt-4 p-2 border rounded">
        <h3 className="font-bold">Preview:</h3>
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: editorHtml }}
        />
      </div>
    </div>
  );
}
