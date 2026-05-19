// import { baseApi } from "../../api/baseApi";

// const authApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: userInfo,
//       }),
//     }),
//     // register endpoint
//     register: builder.mutation({
//       query: (userInfo) => ({
//         url: "/auth/create-user",
//         method: "POST",
//         body: userInfo,
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useRegisterMutation } = authApi;

import { baseApi } from "../../api/baseApi";
import { setAuth } from "./authSlice";
// import { setAuth } from "./authSlice";
// import { setAuth } from "./authSlice";
// import { setAuth } from "./authSlice";
// import { setAuth } from "../features/auth/authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;

          const { user, accessToken, refreshToken } = res.data.data;

          dispatch(setAuth({ user, accessToken, refreshToken }));

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        } catch (err) {
          console.log("Login error", err);
        }
      },
    }),

    // REGISTER
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token: string) => ({
        url: "/auth/verify",
        method: "POST",
        body: { token },
      }),
    }),
    // here is change passdowr change
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
         method: "POST", // or POST (check your backend)
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
    // ME (restore user)
    getMe: builder.query({
      query: () => "/user/me",
      providesTags: ["User"],

      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;

          const user = res.data.data;

          dispatch(
            setAuth({
              user,
              accessToken: localStorage.getItem("accessToken"),
              refreshToken: localStorage.getItem("refreshToken"),
            }),
          );
        } catch (err) {
          console.log("Me error", err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useGetMeQuery,
  useVerifyEmailMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation
} = authApi;
