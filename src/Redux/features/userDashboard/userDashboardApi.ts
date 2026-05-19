import { baseApi } from "../../api/baseApi";

const userDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET user dashboard
    getUserDashboard: builder.query<any, void>({
      query: () => ({
        url: "/user/dashboard",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: "/user/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserAvatar: builder.mutation({
      query: (data) => ({
        url: "/user/avatar",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUserDashboardQuery, useUpdateUserProfileMutation,useUpdateUserAvatarMutation } =
  userDashboardApi;
