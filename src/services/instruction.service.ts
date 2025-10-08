import axiosClient from "@/lib/axios.client";
import buildQueryString from "@/utils/buildQueryString.util";
import type { PaginatedResponse, PaginatedRequest } from "@/types/types";
import type {
  InstructionSchema,
  CreateInstructionFormData,
  UpdateInstructionFormData,
} from "@/schemas/instruction.schema";

export const getInstructions = async ({
  search,
  page,
  limit,
}: PaginatedRequest): Promise<PaginatedResponse<InstructionSchema>> => {
  const queryString = buildQueryString({ search, page, limit });

  const response = await axiosClient.get(`/instructions${queryString ? `?${queryString}` : ""}`);
  return response.data;
};

export const getInstruction = async (id: string) => {
  const response = await axiosClient.get(`/instructions/${id}`);

  return response.data;
};

export const createInstruction = async (data: CreateInstructionFormData): Promise<InstructionSchema> => {
  const response = await axiosClient.post(`/instructions`, data);

  return response.data;
};

export const updateInstruction = async (id: string, data: UpdateInstructionFormData): Promise<InstructionSchema> => {
  const response = await axiosClient.patch(`/instructions/${id}`, data);

  return response.data;
};

export const deleteInstruction = async (id: string): Promise<InstructionSchema> => {
  const response = await axiosClient.delete(`/instructions/${id}`);

  return response.data;
};
