import type { RegisterFormData } from "../schemas/register.schema";
import type { LoginFormData } from "../schemas/login.schema";
import axiosClient from "../lib/axios.client";
import { getRefreshToken, removeTokens, setRefreshToken } from "../lib/auth-tokens";

export const registerUser = async (data: RegisterFormData) => {
  const response = await axiosClient.post("/auth/register", data);

  const refreshToken = response.headers["x-refresh-token"];
  const accessToken = response.headers["x-access-token"];

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  setRefreshToken(refreshToken);

  return response.data;
};

export const loginUser = async (data: LoginFormData) => {
  const response = await axiosClient.post("/auth/login", data);

  const refreshToken = response.headers["x-refresh-token"];
  const accessToken = response.headers["x-access-token"];

  axiosClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  setRefreshToken(refreshToken);

  return response.data;
};

export const refreshTokens = async () => {
  const oldRefreshToken = getRefreshToken();

  const response = await axiosClient.post("/auth/refresh", undefined, { headers: { Authorization: oldRefreshToken } });

  const refreshToken = response.headers["x-refresh-token"];
  const accessToken = response.headers["x-access-token"];

  setRefreshToken(refreshToken);

  return accessToken;
};

export const logoutUser = async () => {
  const refreshToken = getRefreshToken();

  const response = await axiosClient.delete("/auth/logout", { data: { refreshToken } });

  removeTokens();

  return response.data;
};

export const userProfile = async () => {
  const response = await axiosClient.get("/auth/profile");
  return response.data;
};

export const handleInitiateProfile = async () => {
  await refreshTokens();

  return await userProfile();
};
