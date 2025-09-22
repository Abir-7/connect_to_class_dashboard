"use client";

import React, { useState, useEffect } from "react";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TaskTable } from "./table";
import { useGetTasksQuery } from "@/redux/api/taskApi/taskApi";
import LoadingPage from "@/components/loadingScreen/LoadingPage";
import LoadingTable from "@/components/loadingScreen/loadingTable";

const TasksPage = () => {
  const [selectedToggle, setToggle] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [meta, setMeta] = useState({
    page: 1,
    limit: 5,
    totalItem: 0,
    totalPage: 0,
  });

  // 🔥 Fetch tasks
  const { data, isLoading, isError, isFetching } = useGetTasksQuery({
    status:
      selectedToggle.toLowerCase() === "all"
        ? ""
        : selectedToggle.toLowerCase(),
    page: meta.page,
    limit: meta.limit,
    search_term: searchTerm,
  });

  // sync meta from API
  useEffect(() => {
    if (data?.meta) {
      setMeta((prev) => ({
        ...prev,
        totalItem: data.meta.total_item,
        totalPage: data.meta.total_page,
      }));
    }
  }, [data]);

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

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="p-6 space-y-10">
          <div className="border rounded-md">
            <div className="p-6 space-y-6">
              <div className="text-[18px] font-[500]">Task Management</div>

              <div className="flex items-center justify-between">
                <ToggleGroupButton
                  defaultValue="All"
                  options={[
                    { label: "All", value: "All" },
                    { label: "Pending", value: "Pending" },
                    { label: "Ongoing", value: "Ongoing" }, // match backend status
                    { label: "Completed", value: "Completed" },
                  ]}
                  onChange={(val) => {
                    setToggle(val);
                    setMeta((prev) => ({ ...prev, page: 1 }));
                  }}
                />
                <div className="flex items-center gap-4">
                  <SearchCustom
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setMeta((prev) => ({ ...prev, page: 1 }));
                    }}
                  />
                  <Link
                    href={"/task_assign"}
                    className="flex text-nowrap hover:underline items-center"
                  >
                    <Plus className="h-4 w-4 " />
                    New Task
                  </Link>
                </div>
              </div>
            </div>

            <div className="h-[calc(100vh-320px)] overflow-y-auto">
              <hr />
              {isFetching ? (
                <LoadingTable></LoadingTable>
              ) : isError ? (
                <div className="p-4 text-center text-red-500">
                  Error loading tasks
                </div>
              ) : (
                <TaskTable headers={headers} data={data?.data ?? []} />
              )}
              <hr />
            </div>

            <div className="h-16 flex justify-center items-center">
              <PaginationCustom
                meta={meta}
                onPageChange={(newPage) =>
                  setMeta((prev) => ({ ...prev, page: newPage }))
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TasksPage;
