/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import {
  useAddTaskMutation,
  useGetTeacherOptionsQuery,
} from "@/redux/api/taskApi/taskApi";
import { useState } from "react";
import { useDebounce } from "@/utils/helper/debounce";
import { toast } from "sonner";

export default function TaskAssignmentPage() {
  const [addTask, { isLoading }] = useAddTaskMutation();

  const handleSubmit = async (data: any) => {
    try {
      // Convert due_date from Date object to timestamp
      const dueDateTimestamp = new Date(data.due_date).getTime();

      // Prepare payload
      const payload = {
        title: data.title,
        description: data.description,
        assign_to: data.assign_to,
        due_date: dueDateTimestamp,
        due_time: data.due_time, // e.g., "10:30 AM"
        priority: data.priority,
      };

      // Call the API
      const res = await addTask(payload).unwrap();

      if (res.success) {
        toast.success("Task added successfully");
      }
    } catch (error: any) {
      console.error("Failed to assign task:", error);

      toast.error("Failed to assign task. Please try again.");
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const searchText = useDebounce(searchTerm, 700);
  const { data: options = [] } = useGetTeacherOptionsQuery({
    search_term: searchText,
  });

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
              />
              <FormTextarea
                placeholder="Enter task description..."
                required
                label="Task Description"
                name="description"
              />

              <FormDatePicker required name="due_date" label="Due Date" />
              <FormTimePicker required name="due_time" label="Due Time" />

              <FormSelectWithSearch
                required
                name="assign_to"
                label="Assign to"
                options={options}
                search={searchTerm} // pass search state
                setSearch={setSearchTerm} // pass setter
              />
              <FormSelect
                required
                name="priority"
                options={[
                  { label: "Low", value: "low" },
                  { label: "Medium", value: "medium" },
                  { label: "High", value: "high" },
                ]}
                label="Priority level"
              />

              <Button
                type="submit"
                className=" h-[40px]  bg-transparent hover:bg-transparent  transition-all duration-300  active:text-[#ffffff] active:bg-[#359AB1] hover:border-solid text-[#359AB1] border-[#359AB1] border py-2 w-full text-[14px] font-semibold    border-dashed"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Assigning..." : "Assign Task"}
              </Button>
            </BaseForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
