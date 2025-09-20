/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import OverviewCard from "@/components/Dashboard/DashboardOverviewCard/OverviewCard";
import LoadingPage from "@/components/loadingScreen/LoadingPage";
import LoadingTable from "@/components/loadingScreen/loadingTable";

import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { DynamicTable } from "@/components/Table/DashboardTableUser";
import { ToggleGroupButton } from "@/components/Toogle/ToogleGroup/ToggleGroup";
import {
  useGetRecentUsersQuery,
  useGetTotalCountQuery,
} from "@/redux/api/overviewApi/overviewApi";
import { useDebounce } from "@/utils/helper/debounce";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [filter, setFilter] = useState<"last_7_days" | "last_month">(
    "last_month"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 600);
  const [meta, setMeta] = useState({
    totalItem: 0,
    totalPage: 1,
    limit: 10,
    page: 1,
  });

  // fetch API
  const { data, isLoading, isFetching } = useGetRecentUsersQuery({
    type: filter,
    search_term: debouncedSearchTerm,
    page: meta.page,
  });

  // update meta from API response
  useEffect(() => {
    if (data?.meta) {
      setMeta({
        totalItem: data.meta.total_item,
        totalPage: data.meta.total_page,
        limit: data.meta.limit,
        page: data.meta.page,
      });
    }
  }, [data]);

  // transform API data for DynamicTable
  const allData =
    data?.data?.map((user: any) => ({
      full_name: user.full_name,
      nick_name: user.nick_name || "",
      email: user.email,
      joiningdate: new Date(user.createdAt).toLocaleDateString(),
      role: user.role,
      image: user.image || "", // fallback avatar
    })) || [];

  // handle page change
  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  // badge classes
  const getBadgeClasses = (type: string) => {
    switch (type.toLowerCase()) {
      case "teacher":
        return "bg-purple-100 text-purple-800";
      case "parent":
        return "bg-green-100 text-green-800";
      case "student":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const {
    data: total_count_data,

    isLoading: isCountLoading,
  } = useGetTotalCountQuery();

  return (
    <>
      {isLoading || isCountLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="p-6 space-y-10">
          <div className="flex-1 flex flex-wrap gap-4">
            {total_count_data?.data.map((item: any) => (
              <OverviewCard
                isLoading={isCountLoading}
                key={item.type}
                title={item.type.charAt(0).toUpperCase() + item.type.slice(1)} // capitalize
                value={item.count}
                percentage={item.growth === "N/A" ? 0 : Number(item.growth)}
              />
            ))}
          </div>

          <div className="border rounded-md">
            <div className="p-6 space-y-6">
              <div className="text-[18px] font-[500px]">
                Recently Joined Users
              </div>
              <div className="flex items-center justify-between">
                <ToggleGroupButton
                  options={[
                    { label: "View All", value: "last_month" },
                    { label: "Last 7 Days", value: "last_7_days" },
                  ]}
                  defaultValue="last_month"
                  onChange={(val) => {
                    setFilter(val as "last_month" | "last_7_days");
                    setMeta((prev) => ({ ...prev, page: 1 })); // reset page
                  }}
                />

                <SearchCustom
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchTerm(e.target.value);
                    setMeta((prev) => ({ ...prev, page: 1 }));
                  }}
                />
              </div>
            </div>

            <div className="h-[calc(100vh-536px)] overflow-y-auto">
              <hr />{" "}
              {isFetching ? (
                <LoadingTable />
              ) : (
                <>
                  {" "}
                  <DynamicTable
                    headers={["Name", "Email", "Joining Date", "User Type"]}
                    data={allData}
                    avatarField="image"
                    badgeField="role"
                    getBadgeClasses={getBadgeClasses}
                  />
                  <hr />
                </>
              )}
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
