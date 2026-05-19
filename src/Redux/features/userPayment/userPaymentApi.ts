import { baseApi } from "../../api/baseApi";

const userPaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 GET user payment history
    getUserPayments: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/payments/history",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["Payments"],
    }),
  }),
});

export const { useGetUserPaymentsQuery } = userPaymentApi;