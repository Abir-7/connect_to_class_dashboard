"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { User, CheckCircle } from "lucide-react";
import Link from "next/link";
import { BaseForm } from "@/components/ShadCN_Form/BaseForm";
import { FormInput } from "@/components/ShadCN_Form/FormInput";
import { FormTextarea } from "@/components/ShadCN_Form/FormTextarea";
import { FormSelect } from "@/components/ShadCN_Form/FormSelect";

export default function TaskAssignmentPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    dueDate: "",
    dueTime: "",
    priority: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Task assigned:", formData);
    setIsSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        dueDate: "",
        dueTime: "",
        priority: "",
      });
    }, 2000);
  };

  // Mock team members - in a real app, this would come from your database
  const teamMembers = [
    { id: "1", name: "Alice Johnson", role: "Frontend Developer" },
    { id: "2", name: "Bob Smith", role: "Backend Developer" },
    { id: "3", name: "Carol Davis", role: "UI/UX Designer" },
    { id: "4", name: "David Wilson", role: "Project Manager" },
    { id: "5", name: "Eva Brown", role: "QA Engineer" },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-semibold text-foreground">
                Task Assigned!
              </h2>
              <p className="text-muted-foreground">
                The task has been successfully assigned to{" "}
                {teamMembers.find((m) => m.id === formData.assignedTo)?.name}.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <BaseForm defaultValues={{}} onSubmit={handleSubmit}>
              <FormInput
                label="Task Title"
                name="title"
                placeholder="Enter task title..."
              ></FormInput>
              <FormTextarea
                label="Task Description"
                name="description"
              ></FormTextarea>

              <FormInput
                label="Due Date"
                name="date"
                type="date"
                placeholder="Enter task title..."
              ></FormInput>

              <FormInput
                label="Due Time"
                name="title"
                type="time"
                placeholder="Enter task title..."
              ></FormInput>
              <FormSelect
                name="assign_to"
                options={[{ label: "Teacher -1", value: "1" }]}
                label="Assign to"
              ></FormSelect>
              <FormSelect
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
