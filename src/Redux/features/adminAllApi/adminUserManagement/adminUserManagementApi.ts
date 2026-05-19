import { baseApi } from "@/Redux/api/baseApi";

const adminUserManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET ALL USERS (dynamic params from component)
    getAllUsersByAdmin: builder.query({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params, // search, page, limit, filter → সব এখান দিয়ে যাবে
      }),
      providesTags: ["User"], // better naming
    }),
    adminSuspendUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/suspend`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersByAdminQuery ,useAdminSuspendUserMutation} = adminUserManagementApi;
