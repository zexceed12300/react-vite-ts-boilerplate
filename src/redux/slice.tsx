import { createSlice } from "@reduxjs/toolkit";
import { getCookie, setCookie } from "../utils/cookie";

const authLocal = getCookie("auth");
const initialStateAuth = authLocal
  ? JSON.parse(authLocal)
  : { accessToken: null, expiredAt: null, user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    setToken: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      console.log("Auth: Token set: ", action.payload);
      setCookie(
        "auth",
        JSON.stringify({
          ...state,
          accessToken,
          refreshToken,
        })
      );
    },
    setExpire: (state, action) => {
      state.expiredAt = action.payload;
    },
    setUser: (state, action) => {
      console.log("Auth: User set: ", action.payload);
      state.user = action.payload;
      setCookie(
        "auth",
        JSON.stringify({
          ...state,
          user: action.payload,
        })
      );
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiredAt = null;
      state.user = null;
    },
  },
});

export interface EnvState {
  authUrl: string | null;
}

export const envSlice = createSlice({
  name: "env",
  initialState: {
    authUrl: null,
  },
  reducers: {
    setAuthUrl: (state: EnvState, action) => {
      state.authUrl = action.payload;
    },
  },
});

export const { setToken, setExpire, setUser, logout } = authSlice.actions;
export const { setAuthUrl } = envSlice.actions;

export const authReducer = authSlice.reducer;
export const envReducer = envSlice.reducer;
