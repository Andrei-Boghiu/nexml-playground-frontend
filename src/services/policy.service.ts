import axiosClient from "../lib/axios.client";
import type { PolicySchema, CreatePolicyFormData, UpdatePolicyFormData } from "../schemas/policy.schema";
import type { PaginatedResponse } from "../types/types";

export const getPolicies = async (): Promise<PaginatedResponse<PolicySchema>> => {
  const response = await axiosClient.get("/policies");

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
