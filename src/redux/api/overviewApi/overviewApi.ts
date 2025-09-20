/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

export const overviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentUsers: builder.query<
      any,
      { type?: string; search_term?: string; page?: number }
    >({
      query: ({ type = "lastMonth", search_term = "", page = 1 }) => {
        const params = new URLSearchParams({
          type,
          search_term,
          page: String(page),
        });
        return `/dashboard/overview-recent-user?${params.toString()}`;
      },
      providesTags: ["privacy"],
    }),

    getTotalCount: builder.query<any, void>({
      query: () => "/dashboard/overview-total",
      providesTags: ["privacy"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetRecentUsersQuery, useGetTotalCountQuery } = overviewApi;
