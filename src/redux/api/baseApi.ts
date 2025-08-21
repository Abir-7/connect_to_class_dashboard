/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { removeAuth } from "../features/auth/auth";

// 👇 Custom base query with 401 handling and cookie removal
const customBaseQuery: BaseQueryFn<any, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "http://10.10.12.62:4002/api", // change to your actual API URL
    credentials: "include", // include cookies in requests
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.user?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Clear Redux auth state
    api.dispatch(removeAuth());

    // Delete cookie by calling your own API route
    await fetch("/api/auth-data", {
      method: "DELETE",
    });

    // Optional: redirect manually (only works in client-side, not here)
    // router.push("/login") => must be handled in client after auth is cleared
  }

  return result;
};

// 👇 Base API for RTK Query
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  endpoints: () => ({}), // extend in feature files
});
