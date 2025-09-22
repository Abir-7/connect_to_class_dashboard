/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { DynamicTable } from "@/components/Table/DashboardTableUser";
import React, { useState } from "react";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import TeacherDetailsSection from "./_components/TeacherDetails";
import { useParams } from "next/navigation";

import dayjs from "dayjs"; // for formatting dates
import { useGetClassMembersQuery } from "@/redux/api/classApi/classApi";
import { useDebounce } from "@/utils/helper/debounce";
import LoadingTable from "@/components/loadingScreen/loadingTable";
import LoadingPage from "@/components/loadingScreen/LoadingPage";

const Page = () => {
  const { classId } = useParams();

  const [selectedToggle, setToggle] = useState<"student" | "parent">("student");
  const [searchTerm, setSearchTerm] = useState("");

  const searchText = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);

  // Fetch data
  const { data, isLoading, isFetching } = useGetClassMembersQuery({
    classId: classId as string,
    role: selectedToggle,
    searchTerm: searchText,
    page,
  });

  const members = data?.data || [];
  const normalizedMeta = {
    totalItem: data?.meta?.total_item ?? 0,
    totalPage: data?.meta?.total_page ?? 1,
    limit: data?.meta?.limit ?? 10,
    page: data?.meta?.page ?? 1,
  };

  const headers = ["Name", "Email", "JoiningDate", "UserType"];

  const tableData = members.map((m) => ({
    name: m.full_name,
    email: m.email || "N/A", // fallback if no email
    joiningdate: dayjs(m.joined_date).format("MMM D, YYYY"),
    usertype: m.role,
    image: m.image,
  }));
  console.log(tableData);
  const getBadgeClasses = (type: string) => {
    switch (type) {
      case "teacher":
        return "bg-purple-100 text-purple-800";
      case "parent":
        return "bg-green-100 text-green-800";
      case "student":
        return "bg-blue-100 text-blue-800";
      default:
        return "";
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage></LoadingPage>
        </>
      ) : (
        <div className="p-6 space-y-10">
          <div className="border rounded-md">
            <div className="p-6 space-y-6">
              <TeacherDetailsSection classId={classId as string} />
              <hr />
              <div className="flex items-center justify-between">
                <ToggleGroupButton
                  options={[
                    { label: "Students", value: "student" },
                    { label: "Parents", value: "parent" },
                  ]}
                  defaultValue="student"
                  onChange={(val) => {
                    setToggle(val as "student" | "parent");
                    setPage(1);
                  }}
                />

                <SearchCustom
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            <div className="h-[calc(100vh-434px)] overflow-y-auto">
              <hr />
              {isFetching ? (
                <LoadingTable></LoadingTable>
              ) : (
                <>
                  <DynamicTable
                    headers={headers}
                    data={tableData}
                    avatarField="image"
                    badgeField="usertype"
                    getBadgeClasses={getBadgeClasses}
                  />
                  <hr />
                </>
              )}
            </div>

            <div className="h-16 flex justify-center items-center">
              <PaginationCustom
                meta={normalizedMeta}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
