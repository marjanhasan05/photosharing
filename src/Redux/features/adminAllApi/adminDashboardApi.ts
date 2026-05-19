import { baseApi } from "../../api/baseApi";

const adminDashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET user payment history
    getAdminDashboard: builder.query({
      query: () => ({
        url: "/admin/dashboard",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAdminDashboardQuery} = adminDashboardApi;
