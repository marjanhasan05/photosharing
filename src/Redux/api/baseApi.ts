// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

// // Define a service using a base URL and expected endpoints
// export const baseApi = createApi({
//   reducerPath: "baseApi", // or just "api" if you prefer
//   baseQuery: fetchBaseQuery({
//     // baseUrl: "http://localhost:5000/api",
//     baseUrl: "https://accessory-august-instructions-limits.trycloudflare.com/api/v1",
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth?.accessToken;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
//   tagTypes: ["User", ""],
// });

// new code
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setAuth } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,

  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

// 🔥 AUTO REFRESH WRAPPER
const baseQueryWithRefresh = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // If token expired
  if (result?.error?.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken },
        },
        api,
        extraOptions,
      );

      // ✅ if refresh success
      if (refreshResult?.data) {
        const { accessToken, refreshToken: newRefreshToken } = (
          refreshResult.data as any
        ).data;

        // ✅ update redux (FULL AUTH STATE)
        api.dispatch(
          setAuth({
            user: (api.getState() as RootState).auth.user,
            accessToken,
            refreshToken: newRefreshToken,
          }),
        );

        // ✅ persist tokens
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 🔁 retry original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.log("Refresh token expired");
      }
    }
  }

  return result;
};

//  API
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefresh,

  tagTypes: ["User", "EventPackages","Events","Payments","Transactions"],

  endpoints: () => ({}),
});
