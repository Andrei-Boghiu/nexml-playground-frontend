import axiosClient from "@/lib/axios.client";
import buildQueryString from "@/utils/buildQueryString.util";
import type { PaginatedRequest, PaginatedResponse } from "@/types/types";
import type { ArchiveSchema, CreateArchiveFormData, UpdateArchiveFormData } from "@/schemas/archive.schema";

export const getArchives = async ({
  search,
  page,
  limit,
}: PaginatedRequest): Promise<PaginatedResponse<ArchiveSchema>> => {
  const queryString = buildQueryString({ search, page, limit });

  const response = await axiosClient.get(`/archives${queryString ? `?${queryString}` : ""}`);

  return response.data;
};

export const getArchive = async (id: string) => {
  const response = await axiosClient.get(`/archives/${id}`);

  return response.data;
};

export const createArchive = async (data: CreateArchiveFormData): Promise<ArchiveSchema> => {
  const response = await axiosClient.post(`/archives`, data);

  return response.data;
};

export const updateArchive = async (id: string, data: UpdateArchiveFormData): Promise<ArchiveSchema> => {
  const response = await axiosClient.patch(`/archives/${id}`, data);

  return response.data;
};

export const deleteArchive = async (id: string): Promise<ArchiveSchema> => {
  const response = await axiosClient.delete(`/archives/${id}`);

  return response.data;
};
