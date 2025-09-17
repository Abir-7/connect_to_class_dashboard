/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useMemo } from "react";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";

import { Plus } from "lucide-react";
import { Task, TaskTable } from "./table";
import Link from "next/link";

const TasksPage = () => {
  const [selectedToggle, setToggle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [meta, setMeta] = useState({
    page: 1,
    limit: 5,
    totalItem: 0,
    totalPage: 0,
  });

  // Columns to display
  const headers = [
    "Task",
    "Description",
    "Assigned To",
    "Email",
    "Mobile",
    "Due Date",
    "Priority",
    "Status",
  ];

  // Mock data
  const allTasks: Task[] = [
    {
      _id: "1",
      title: "Design Landing Page",
      description: "Create a responsive landing page",
      assign_to: {
        _id: "t1",
        full_name: "John Doe",
        role: "TEACHER",
        email: "john@example.com",
        phone: "+8801712345678",
      },
      due_date: "2025-09-25",
      due_time: "10:30 AM",
      priority: "high",
      status: "pending",
    },
    {
      _id: "2",
      title: "Write API Docs",
      description: "Document all REST endpoints",
      assign_to: {
        _id: "t2",
        full_name: "Alice Smith",
        role: "DEVELOPER",
        email: "alice@example.com",
        phone: "+8801911223344",
      },
      due_date: "2025-09-22",
      due_time: "11:00 AM",
      priority: "medium",
      status: "completed",
    },
    {
      _id: "3",
      title: "Setup Authentication",
      description: "Setup secure login with JWT",
      assign_to: {
        _id: "t3",
        full_name: "Bob Lee",
        role: "ADMIN",
        email: "bob@example.com",
        phone: "+8801811334455",
      },
      due_date: "2025-09-28",
      due_time: "02:00 PM",
      priority: "low",
      status: "in-progress",
    },
  ];

  // Filter & search
  const filteredTasks = useMemo(() => {
    let data = allTasks;

    if (selectedToggle === "Pending") {
      data = data.filter((t) => t.status === "pending");
    } else if (selectedToggle === "Ongoing") {
      data = data.filter((t) => t.status === "in-progress");
    } else if (selectedToggle === "Completed") {
      data = data.filter((t) => t.status === "completed");
    }

    if (searchTerm) {
      data = data.filter(
        (t) =>
          t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          t.assign_to.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    const totalItem = data.length;
    const totalPage = Math.ceil(totalItem / meta.limit);
    setMeta((prev) => ({ ...prev, totalItem, totalPage }));

    const start = (meta.page - 1) * meta.limit;
    return data.slice(start, start + meta.limit);
  }, [selectedToggle, searchTerm, meta.page, meta.limit]);

  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="p-6 space-y-10">
      <div className="border rounded-md">
        <div className="p-6 space-y-6">
          <div className="text-[18px] font-[500]">Task Management</div>

          <div className="flex items-center justify-between">
            <ToggleGroupButton
              options={[
                { label: "All", value: "All" },
                { label: "Pending", value: "Pending" },
                { label: "Ongoing", value: "Ongoing" },
                { label: "Completed", value: "Completed" },
              ]}
              onChange={(val) => {
                setToggle(val);
                setMeta((prev) => ({ ...prev, page: 1 }));
              }}
            />
            <div className="flex items-center gap-2">
              <SearchCustom
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setMeta((prev) => ({ ...prev, page: 1 }));
                }}
              />

              <Link
                href={"/task-assign"}
                className="flex text-nowrap gap-2 items-center"
              >
                {" "}
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Link>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-320px)] overflow-y-auto">
          <hr />
          <TaskTable headers={headers} data={filteredTasks} />
          <hr />
        </div>

        <div className="h-16 flex justify-center items-center">
          <PaginationCustom meta={meta} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
