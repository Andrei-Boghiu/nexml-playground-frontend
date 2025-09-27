export type UserRole = "USER" | "ADMIN" | "DEV";

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
