import axios from "axios";
import { getCookie } from "../utils/cookie";

export const getAuthAccessToken = () => {
  const auth = getCookie("auth");
  const accessToken = auth ? JSON.parse(auth).accessToken : null;

  return accessToken;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthAccessToken()}`,
  },
});

export default axiosInstance;
