/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const classApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClass: builder.query<
      any,
      { type?: string; search_term?: string; page?: number }
    >({
      query: ({ search_term = "", page = 1 }) => {
        const params = new URLSearchParams({
          search_term,
          page: String(page),
        });
        return `/dashboard/get-all-class?${params.toString()}`;
      },
    }),
    getTeacherOfClass: builder.query({
      query: (class_id: string) => ({
        url: `dashboard/get-teachers-info-of-class/${class_id}`,
        method: "GET",
      }),
    }),
    getClassMembers: builder.query<
      { data: any[]; meta: any },
      {
        classId: string;
        role?: string;
        searchTerm?: string;
        page?: number;
      }
    >({
      query: ({ classId, role, searchTerm, page = 1 }) => {
        const params: Record<string, any> = { role, page };

        if (searchTerm && searchTerm.trim() !== "") {
          params.search_term = searchTerm;
        }

        return {
          url: `/dashboard/get-class-members/${classId}`,
          method: "GET",
          params,
        };
      },
    }),
    getAllEvent: builder.query<
      { data: any[]; meta: any; success: boolean; message: string },
      { type?: string; search_term?: string; page?: number }
    >({
      query: ({ type = "all", search_term = "", page = 1 }) => {
        const params = new URLSearchParams({
          type,
          search_term,
          page: String(page),
        });
        return `/dashboard/get-all-event?${params.toString()}`;
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllClassQuery,
  useGetTeacherOfClassQuery,
  useGetClassMembersQuery,
  useGetAllEventQuery,
} = classApi;
