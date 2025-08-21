import { TUserRoles } from "@/interface/authinterface";
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data: {
        email: string;
        fullName: string;
        password: string;
        role: TUserRoles;
      }) => ({
        url: "/auth/create-user",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    getMe: builder.query({
      query: () => "/user/me",
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useGetMeQuery, useCreateUserMutation } =
  authApi;
