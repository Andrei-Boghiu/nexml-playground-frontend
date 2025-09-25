import axiosClient from "../lib/axios.client";
import type { ResumeSchema, CreateResumeFormData, UpdateResumeFormData } from "../schemas/resume.schema";
import type { PaginatedResponse } from "../types/types";

export const getResumes = async (): Promise<PaginatedResponse<ResumeSchema>> => {
  const response = await axiosClient.get("/resumes");

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
