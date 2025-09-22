/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";

export interface AssignedUser {
  _id: string;
  full_name: string;
  role: string;
  image?: string;
  email?: string;
  phone?: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  assign_to: AssignedUser;
  due_date: string;
  due_time: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
}

interface TaskTableProps {
  headers: string[];
  data: Task[];
}

const getInitials = (text: string) =>
  text
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const TaskTable: React.FC<TaskTableProps> = ({ headers, data }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-yellow-400 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header} className="font-medium text-gray-600">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((task, index) => (
          <TableRow
            key={task._id}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            {headers.map((header) => {
              const key = header.toLowerCase().replace(/\s+/g, "");

              if (key === "task") {
                return (
                  <TableCell key={header} className="font-semibold">
                    {task.title}
                  </TableCell>
                );
              }

              if (key === "description") {
                return (
                  <TableCell key={header} className="text-gray-600">
                    {task.description}
                  </TableCell>
                );
              }

              if (key === "assignedto") {
                return (
                  <TableCell key={header}>
                    <div className="flex gap-3 items-center">
                      <Avatar className="h-8 w-8">
                        {task.assign_to?.image ? (
                          <AvatarImage
                            src={task.assign_to.image}
                            alt={task.assign_to.full_name}
                          />
                        ) : (
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {getInitials(task.assign_to?.full_name || "NA")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <div className="font-medium text-[14px] text-gray-900">
                          {task.assign_to?.full_name}
                        </div>
                        <div className="text-gray-500 text-[13px]">
                          {task.assign_to?.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                );
              }

              if (key === "email") {
                return (
                  <TableCell key={header}>
                    {task.assign_to?.email || "N/A"}
                  </TableCell>
                );
              }

              if (key === "mobile") {
                return (
                  <TableCell key={header}>
                    {task.assign_to?.phone || "N/A"}
                  </TableCell>
                );
              }

              if (key === "duedate") {
                return (
                  <TableCell key={header} className="text-gray-500">
                    {dayjs(task.due_date).format("YYYY-MM-DD")}
                    <div className="text-xs">{task.due_time}</div>
                  </TableCell>
                );
              }

              if (key === "priority") {
                return (
                  <TableCell key={header}>
                    <div
                      className={`inline-block px-2 py-1 rounded-full text-xs ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </div>
                  </TableCell>
                );
              }

              if (key === "status") {
                return (
                  <TableCell key={header}>
                    <div
                      className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </div>
                  </TableCell>
                );
              }

              return <TableCell key={header}>N/A</TableCell>;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
