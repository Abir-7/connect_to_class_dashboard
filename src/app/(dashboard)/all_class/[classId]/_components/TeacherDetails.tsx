"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { useGetTeacherOfClassQuery } from "@/redux/api/classApi/classApi";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TeacherDetailsSection = ({ classId }: { classId: string }) => {
  // call API
  const { data, isLoading, isError } = useGetTeacherOfClassQuery(classId);

  const teacher = data?.data;

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  if (isLoading) {
    return (
      <div className="rounded-md flex justify-center items-center border p-4 py-2">
        <div className="flex flex-col items-center gap-2 text-gray-900">
          <svg
            className="animate-spin h-6 w-6 text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
          <span className="text-sm font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError || !teacher) {
    return (
      <div className="text-center text-gray-500 py-4">
        No teacher info available
      </div>
    );
  }

  return (
    <div className="rounded-md border p-4">
      {/* Title */}
      <div className="flex justify-between">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4 ">
          <Link href="/all-class">
            <ArrowLeft size={20}></ArrowLeft>
          </Link>
          <Avatar className="h-10 w-10">
            {teacher.image ? (
              <AvatarImage
                src={teacher.image}
                alt={teacher.name}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : null}
            <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-semibold">
              {getInitials(teacher.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{teacher.name}</div>
            <div className="text-xs text-gray-600 capitalize">
              {teacher.role}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-[13px]">
          <div className=" text-md font-bold capitalize">
            {teacher.class_name}
          </div>
          <div className="flex">
            <span className="text-gray-900">{teacher.email}</span>
          </div>
          {teacher?.mobile && (
            <div className="flex">
              <span className="text-gray-900">{teacher.mobile}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDetailsSection;
