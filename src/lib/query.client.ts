import { QueryClient } from "@tanstack/react-query";
import axiosClient from "./axios.client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const { data } = await axiosClient.get(String(queryKey[0]));
        return data;
      },
      retry: 3,
      retryDelay: 500,
      staleTime: 5 * 60_000, // cache data for 5m
    },
    mutations: {
      retry: 0,
    },
  },
});
