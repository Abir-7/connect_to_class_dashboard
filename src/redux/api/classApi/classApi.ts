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
  }),
  overrideExisting: false,
});

export const { useGetAllClassQuery } = classApi;
