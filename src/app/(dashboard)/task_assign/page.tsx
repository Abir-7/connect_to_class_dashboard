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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, User, CheckCircle } from "lucide-react";
import Link from "next/link";

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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          <CardContent className="h-full ">
            <form onSubmit={handleSubmit} className="space-y-6 h-full relative">
              {/* Task Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  placeholder="Enter task title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              {/* Task Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Task Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the task in detail..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={20}
                  required
                />
              </div>

              {/* Assign To */}
              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To</Label>
                <Select
                  value={formData.assignedTo}
                  onValueChange={(value) =>
                    handleInputChange("assignedTo", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member..." />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{member.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {member.role}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Due Date
                  </Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      handleInputChange("dueDate", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueTime" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Due Time
                  </Label>
                  <Input
                    id="dueTime"
                    type="time"
                    value={formData.dueTime}
                    onChange={(e) =>
                      handleInputChange("dueTime", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleInputChange("priority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        Low Priority
                      </span>
                    </SelectItem>
                    <SelectItem value="medium">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        Medium Priority
                      </span>
                    </SelectItem>
                    <SelectItem value="high">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        High Priority
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div className="mt-20">
                <Button
                  type="submit"
                  className=" h-[40px]  bg-transparent hover:bg-transparent  transition-all duration-300  active:text-[#ffffff] active:bg-[#359AB1] hover:border-solid text-[#359AB1] border-[#359AB1] border py-2 w-full text-[14px] font-semibold    border-dashed"
                  size="lg"
                >
                  Assign Task
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
