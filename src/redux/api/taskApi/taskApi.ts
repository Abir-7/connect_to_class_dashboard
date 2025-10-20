/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation<
      any,
      {
        title: string;
        description: string;
        assign_to: string;
        due_date: number; // timestamp
        due_time: string;
        priority: string;
      }
    >({
      query: (data) => ({
        url: "/task/add-task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    getTeacherOptions: builder.query<
      { label: string; value: string }[], // expected response type
      { search_term?: string }
    >({
      query: ({ search_term = "" } = {}) => {
        const params = new URLSearchParams();
        if (search_term) params.append("search_term", search_term);
        return `/dashboard/get-teacher-option?${params.toString()}`;
      },

      transformResponse: (response: any) => response.data,
    }),

    getTasks: builder.query<
      any,
      { status?: string; page?: number; limit?: number; search_term?: string }
    >({
      query: ({ status = "", page = 1, limit = 5, search_term = "" }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        });
        if (status) params.append("status", status);
        if (search_term) params.append("search_term", search_term);

        return `/task/all-task?${params.toString()}`;
      },
      providesTags: ["Tasks"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTaskMutation,
  useGetTeacherOptionsQuery,
  useGetTasksQuery,
} = taskApi;
