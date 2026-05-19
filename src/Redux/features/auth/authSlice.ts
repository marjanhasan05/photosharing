// // import { RootState } from "@/redux/store";
// import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";
// // import { RootState } from "../../store";

// export type TUser = {
//   userId: string;
//   role: string;
//   email: string;
//   name: string;
//   iat: number;
//   exp: number;
//   profileImg: string;
// };

// type TAuthState = {
//   user: null | TUser;
//   accessToken: null | string;
// };

// const initialState: TAuthState = {
//   user: null,
//   accessToken: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action) => {
//       const { user, token } = action.payload;
//       state.user = user;
//       state.accessToken = token;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.accessToken = null;
//     },
//   },
// });

// export const { setUser, logout } = authSlice.actions;

// export default authSlice.reducer;

// export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
// export const selectCurrentUser = (state: RootState) => state.auth.user;

// new code

// import { RootState } from "@/Redux/store";
import { RootState } from "@/Redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  avatar?: string | null;
};

type TAuthState = {
  user: TUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: TAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<any>) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },

    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setAuth, setUser, setAccessToken, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;

// for refresh token
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;