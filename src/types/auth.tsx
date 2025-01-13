import { ApiResponse } from "./apiResponse";

export type RefreshRequestType = {
  refresh_token: string;
};

export type LoginRequestType = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

export type LoginResponseType = ApiResponse<LoginResponse>;
