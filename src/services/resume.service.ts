import axiosClient from "@/lib/axios.client";
import buildQueryString from "@/utils/buildQueryString.util";
import type { PaginatedRequest, PaginatedResponse } from "@/types/types";
import type { ResumeSchema, CreateResumeFormData, UpdateResumeFormData } from "@/schemas/resume.schema";

export const getResumes = async ({
  search,
  page,
  limit,
}: PaginatedRequest): Promise<PaginatedResponse<ResumeSchema>> => {
  const queryString = buildQueryString({ search, page, limit });

  const response = await axiosClient.get(`/resumes${queryString ? `?${queryString}` : ""}`);

  return response.data;
};

export const getResume = async (id: string) => {
  const response = await axiosClient.get(`/resumes/${id}`);

  return response.data;
};

export const createResume = async (data: CreateResumeFormData): Promise<ResumeSchema> => {
  const response = await axiosClient.post(`/resumes`, data);

  return response.data;
};

export const updateResume = async (id: string, data: UpdateResumeFormData): Promise<ResumeSchema> => {
  const response = await axiosClient.patch(`/resumes/${id}`, data);

  return response.data;
};

export const deleteResume = async (id: string): Promise<ResumeSchema> => {
  const response = await axiosClient.delete(`/resumes/${id}`);

  return response.data;
};
