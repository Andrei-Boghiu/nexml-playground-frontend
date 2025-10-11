import { AxiosError } from "axios";

export type UserRole = "USER" | "ADMIN" | "DEV";

export type ApiErrorResponse = {
  error?: string;
  message?: string;
};

export type ApiError = AxiosError<ApiErrorResponse>;

export type PaginatedRequest = {
  search?: string;
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type PaginationConfig = {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
};
