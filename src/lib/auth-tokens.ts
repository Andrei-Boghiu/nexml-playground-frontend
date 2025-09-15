import axiosClient from "./axios.client";

const REFRESH_TOKEN_KEY = "REFRESH_TOKEN_MEOW";

export const setRefreshToken = (newToken: string) => window.localStorage.setItem(REFRESH_TOKEN_KEY, newToken);
export const getRefreshToken = () => window.localStorage.getItem(REFRESH_TOKEN_KEY);
export const removeRefreshToken = () => window.localStorage.clear();

export const setAccessToken = (newToken: string) =>
  (axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`);
export const removeAccessToken = () => delete axiosClient.defaults.headers.common.Authorization;

export const removeTokens = () => {
  removeAccessToken();
  removeRefreshToken();
};
