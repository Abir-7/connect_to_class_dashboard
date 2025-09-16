import { baseApi } from "../baseApi";

export const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPrivacy: builder.mutation({
      query: (data: { title: string; editor_html: string }) => ({
        url: "/privacy/add-edit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["privacy"],
    }),

    getPrivacy: builder.query({
      query: () => "/privacy",
      providesTags: ["privacy"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPrivacyQuery, useAddPrivacyMutation } = privacyApi;
