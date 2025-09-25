import axiosClient from "../lib/axios.client";
import type { ArchiveSchema, CreateArchiveFormData, UpdateArchiveFormData } from "../schemas/archive.schema";
import type { PaginatedResponse } from "../types/types";

export const getArchives = async (): Promise<PaginatedResponse<ArchiveSchema>> => {
  const response = await axiosClient.get("/archives");

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
