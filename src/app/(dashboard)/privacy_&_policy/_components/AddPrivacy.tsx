/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseForm } from "@/components/ShadCN_Form/BaseForm";
import { FormInput } from "@/components/ShadCN_Form/FormInput";
import React, { useState } from "react";
import { RichTextEditorDemo } from "./TextEditor";
import { Button } from "@/components/ui/button";
import { useAddPrivacyMutation } from "@/redux/api/privacyApi/privacyApi";
import { toast } from "sonner";

const AddPrivacy = () => {
  const [editorHtml, setEditorHtml] = useState("");

  const [addPrivacy, { isLoading }] = useAddPrivacyMutation();

  const onSubmit = async (data: any) => {
    console.log({ ...data, editor_html: editorHtml });

    const res = (await addPrivacy({ ...data, editor_html: editorHtml })) as any;
    console.log(res, "gg");
    if (res.data.success) {
      toast.success("Privacy updated successfully.");
    } else {
      toast.error("Something went wrong! Try again.");
    }
  };
  return (
    <div className=" space-y-4 ">
      <div className="border h-[calc(100vh-176px)] pb-6 overflow-y-auto rounded-md px-4 pt-4">
        <BaseForm onSubmit={onSubmit} defaultValues={{ title: "Our Privacy" }}>
          <FormInput
            name="title"
            label="Policy Title"
            placeholder="Title"
          ></FormInput>

          <RichTextEditorDemo onChange={setEditorHtml} />

          <Button className=" h-[40px]  bg-transparent hover:bg-transparent  transition-all duration-300  active:text-[#ffffff] active:bg-[#359AB1] hover:border-solid text-[#359AB1] border-[#359AB1] border py-2 w-full  text-[14px] font-semibold  border-dashed">
            {isLoading ? "Updating..." : "Update Policy"}
          </Button>
        </BaseForm>
      </div>

      {/* Live preview */}
      {/* <div className="mt-4 p-2 border rounded">
            <h3 className="font-bold">Preview:</h3>
            <div
              className="text-sm"
              dangerouslySetInnerHTML={{ __html: editorHtml }}
            />
          </div> */}
    </div>
  );
};

export default AddPrivacy;
