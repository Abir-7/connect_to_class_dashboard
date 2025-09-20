/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../baseApi";

interface GetAllUsersParams {
  role?: "ALL" | "STUDENT" | "TEACHER" | "PARENT"; // restrict roles
  search_term?: string;
  page?: number;
}

interface Meta {
  total_item: number;
  total_page: number;
  limit: number;
  page: number;
}

interface UserData {
  _id: string;
  email: string;
  role: string;
  full_name: string;
  nick_name: string;
  date_of_birth: string;
  phone: string;
  address: string;
  image: string;
  avatar_id: string;
  gender: string;
  parent?: string;
}

interface GetAllUsersResponse {
  meta: Meta;
  data: UserData[];
}

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
    }),

    getTotalCount: builder.query<any, void>({
      query: () => "/dashboard/overview-total",
    }),
    getAllUsers: builder.query<GetAllUsersResponse, GetAllUsersParams>({
      query: (params) => ({
        url: "/dashboard/get-all-user",
        method: "GET",
        params, // typed params
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRecentUsersQuery,
  useGetTotalCountQuery,
  useGetAllUsersQuery,
} = overviewApi;
