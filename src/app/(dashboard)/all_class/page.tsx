/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { PaginationCustom } from "@/components/Pagination/PaginationCustom";
import SearchCustom from "@/components/Search/SearchCustom";
import { ClassTable } from "@/components/Table/DashboardTableClass";
import { useGetAllClassQuery } from "@/redux/api/classApi/classApi";
import { useDebounce } from "@/utils/helper/debounce";
import LoadingPage from "@/components/loadingScreen/LoadingPage";
import LoadingTable from "@/components/loadingScreen/loadingTable";

const Page = () => {
  const headers = ["Class", "Teacher", "Class Created"];

  const [meta, setMeta] = useState({
    totalItem: 0,
    totalPage: 1,
    limit: 10,
    page: 1,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounce(searchTerm);
  // Fetch from API
  const { data, isLoading, isFetching } = useGetAllClassQuery({
    search_term: debounceSearch,
    page: meta.page,
  });

  // Extract API response
  const classData = data?.data || [];
  const apiMeta = data?.meta;

  // Sync meta with API response
  React.useEffect(() => {
    if (apiMeta) {
      setMeta((prev) => ({
        ...prev,
        totalItem: apiMeta.total_item,
        totalPage: apiMeta.total_page,
        limit: apiMeta.limit,
        page: apiMeta.page,
      }));
    }
  }, [apiMeta]);

  const handlePageChange = (newPage: number) => {
    setMeta((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <>
      {isLoading ? (
        <LoadingPage></LoadingPage>
      ) : (
        <div className="p-6 space-y-10">
          <div className="border rounded-md">
            <div className="p-6 space-y-6">
              <div className="text-[18px] font-[500]">All Classes</div>
              <div className="flex items-center justify-between">
                <SearchCustom
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setMeta((prev) => ({ ...prev, page: 1 })); // reset to page 1 when searching
                  }}
                />
              </div>
            </div>

            <div className="h-[calc(100vh-318px)] overflow-y-auto">
              <hr />

              {isFetching ? (
                <LoadingTable></LoadingTable>
              ) : (
                <>
                  {" "}
                  <ClassTable
                    headers={headers}
                    data={classData.map((item: any) => ({
                      id: item._id,
                      class: item.class_name,
                      classImage: item.image,
                      user: item.profile_full_name,
                      userName: item.teacher_email,
                      image: item.profile_image,
                      subject: item.description,
                      section: "",
                      createdAt: new Date(item.createdAt).toLocaleDateString(),
                    }))}
                    getClassLink={(row) => `/all_class/${row.id}`}
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
