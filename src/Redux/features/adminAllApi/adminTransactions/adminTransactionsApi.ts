import { baseApi } from "@/Redux/api/baseApi";

const adminTransactionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET ALL TRANSACTIONS (Admin)
    getAllTransactionsByAdmin: builder.query({
      query: (params) => ({
        url: "/admin/transactions",
        method: "GET",
        params, // page, limit, plan
      }),
      providesTags: ["Transactions"],
    }),
     getAdminFinancialStatistics: builder.query({
      query: () => ({
        url: "/admin/financial-statistics",
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetAllTransactionsByAdminQuery,
  useGetAdminFinancialStatisticsQuery
} = adminTransactionsApi;