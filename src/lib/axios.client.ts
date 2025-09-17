import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { refreshTokens } from "../services/auth.service";
import { removeTokens } from "./auth-tokens";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const refreshAuth = async () => {
  try {
    const accessToken = await refreshTokens();

    if (accessToken) {
      axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return Promise.resolve(accessToken);
    } else new Error("No access token received");
  } catch (error) {
    removeTokens();
    return Promise.reject(error ?? new Error("Token refresh failed"));
  }
};

createAuthRefreshInterceptor(axiosClient, refreshAuth, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

export default axiosClient;
