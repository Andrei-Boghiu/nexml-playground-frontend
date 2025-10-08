import axiosClient from "@/lib/axios.client";
import buildQueryString from "@/utils/buildQueryString.util";
import type { PolicySchema, CreatePolicyFormData, UpdatePolicyFormData } from "@/schemas/policy.schema";
import type { PaginatedRequest, PaginatedResponse } from "@/types/types";

export const getPolicies = async ({
  search,
  page,
  limit,
}: PaginatedRequest): Promise<PaginatedResponse<PolicySchema>> => {
  const queryString = buildQueryString({ search, page, limit });

  const response = await axiosClient.get(`/policies${queryString ? `?${queryString}` : ""}`);

  return response.data;
};

export const getPolicy = async (id: string) => {
  const response = await axiosClient.get(`/policies/${id}`);

  return response.data;
};

export const createPolicy = async (data: CreatePolicyFormData): Promise<PolicySchema> => {
  const response = await axiosClient.post(`/policies`, data);

  return response.data;
};

export const updatePolicy = async (id: string, data: UpdatePolicyFormData): Promise<PolicySchema> => {
  const response = await axiosClient.patch(`/policies/${id}`, data);

  return response.data;
};

export const deletePolicy = async (id: string): Promise<PolicySchema> => {
  const response = await axiosClient.delete(`/policies/${id}`);

  return response.data;
};
