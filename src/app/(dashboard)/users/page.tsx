/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DynamicTable } from "@/components/Table/DashboardTableUser";
import React, { useState } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import { useGetAllUsersQuery } from "@/redux/api/overviewApi/overviewApi";
import LoadingPage from "@/components/loadingScreen/LoadingPage";

// ✅ IMeta type
interface IMeta {
  totalItem: number;
  totalPage: number;
  limit: number;
  page: number;
}

const Page = () => {
  const [selectedToggle, setToggle] = useState<
    "ALL" | "TEACHER" | "STUDENT" | "PARENT"
  >("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Map toggle to backend role param
  const roleParam = selectedToggle; // All already in uppercase

  // Fetch data from API
  const { data, isLoading } = useGetAllUsersQuery({
    role: roleParam,
    search_term: searchTerm,
    page,
  });

  // Map backend meta to IMeta
  const apiMeta = data?.meta;
  const meta: IMeta = apiMeta
    ? {
        totalItem: apiMeta.total_item,
        totalPage: apiMeta.total_page,
        limit: apiMeta.limit,
        page: apiMeta.page,
      }
    : { totalItem: 0, totalPage: 1, limit: 10, page }; // Added default limit

  // Badge classes using all uppercase roles
  const getBadgeClasses = (type: string) => {
    switch (type.toUpperCase()) {
      case "TEACHER":
        return "bg-purple-100 text-purple-800";
      case "PARENT":
        return "bg-green-100 text-green-800";
      case "STUDENT":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const headers = ["Name", "Email", "Joining Date", "User Type"];
  const allData = data?.data || [];

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="p-6 space-y-10">
          <div className="border rounded-md">
            <div className="p-6 space-y-6">
              <div className="text-[18px] font-[500px]">
                {selectedToggle === "ALL" ? "All Users" : selectedToggle}
              </div>
              <div className="flex items-center justify-between">
                <ToggleGroupButton
                  options={[
                    { label: "All Users", value: "ALL" },
                    { label: "Teacher", value: "TEACHER" },
                    { label: "Student", value: "STUDENT" },
                    { label: "Parent", value: "PARENT" },
                  ]}
                  onChange={(val) => {
                    setToggle(val as any); // cast to match state type
                    setPage(1); // reset page
                  }}
                />

                <SearchCustom
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1); // reset page
                  }}
                />
              </div>
            </div>

            <div className="h-[calc(100vh-320px)] overflow-y-auto">
              <hr />
              <DynamicTable
                headers={headers}
                data={allData}
                avatarField="image"
                badgeField="role"
                getBadgeClasses={getBadgeClasses}
              />
              <hr />
            </div>

            <div className="h-16 flex justify-center items-center">
              <PaginationCustom meta={meta} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
