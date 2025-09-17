/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { User } from "lucide-react";
import Link from "next/link";
import { BaseForm } from "@/components/ShadCN_Form/BaseForm";
import { FormInput } from "@/components/ShadCN_Form/FormInput";
import { FormTextarea } from "@/components/ShadCN_Form/FormTextarea";
import { FormSelect } from "@/components/ShadCN_Form/FormSelect";
import { FormDatePicker } from "@/components/ShadCN_Form/FormDatePicker";
import { FormTimePicker } from "@/components/ShadCN_Form/FormTimePicker";
import { FormSelectWithSearch } from "@/components/ShadCN_Form/FormSelectWithSearch";

export default function TaskAssignmentPage() {
  const handleSubmit = (data: any) => {};

  const countryOptions = [
    { label: "United States", value: "us" },
    { label: "Canada", value: "ca" },
    { label: "United Kingdom", value: "uk" },
    { label: "Australia", value: "au" },
    { label: "Bangladesh", value: "bd" },
    { label: "India", value: "in" },
  ];

  return (
    <div className="bg-background p-6  h-[calc(100vh-160px)]">
      <div className=" mx-auto space-y-6">
        <Card className="shadow-none rounded-md h-[calc(100vh-118px)] overflow-y-auto">
          <div className="flex justify-between pe-6">
            <CardHeader className="shadow-none flex-1">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                New Task Details
              </CardTitle>
              <CardDescription>
                Fill in the information below to create and assign a new task
              </CardDescription>
            </CardHeader>
            <Link
              className=" bg-transparent hover:bg-transparent  transition-all duration-300  active:text-[#ffffff] active:bg-[#359AB1]  hover:border-solid text-[#359AB1] border-[#359AB1] border text-[14px] font-semibold  border-dashed px-4 h-8 flex justify-center items-center rounded-md "
              href={"/task_assign/list"}
            >
              See task update
            </Link>
          </div>
          <CardContent className="h-full mt-0">
            <BaseForm
              defaultValues={{
                title: "",
                description: "",
                due_date: "",
                due_time: "",
                assign_to: "",
                priority: "low",
              }}
              onSubmit={handleSubmit}
            >
              <FormInput
                required
                label="Task Title"
                name="title"
                placeholder="Enter task title..."
              ></FormInput>
              <FormTextarea
                placeholder="Enter task description..."
                required
                label="Task Description"
                name="description"
              ></FormTextarea>

              <FormDatePicker
                required
                name="due_date"
                label="Due Date"
              ></FormDatePicker>
              <FormTimePicker
                required
                name="due_date"
                label="Due Time"
              ></FormTimePicker>
              <FormSelectWithSearch
                required
                name="assign_to"
                label="Assign to"
                options={countryOptions}
                placeholder="Select a teacher"
              ></FormSelectWithSearch>
              <FormSelect
                required
                name="Priority Level"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Mediam", value: "mediam" },
                  { label: "High", value: "high" },
                ]}
                label="Priority level"
              ></FormSelect>

              <Button
                type="submit"
                className=" h-[40px]  bg-transparent hover:bg-transparent  transition-all duration-300  active:text-[#ffffff] active:bg-[#359AB1] hover:border-solid text-[#359AB1] border-[#359AB1] border py-2 w-full text-[14px] font-semibold    border-dashed"
                size="lg"
              >
                Assign Task
              </Button>
            </BaseForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
