import axiosClient from "@/lib/axios.client";
import buildQueryString from "@/utils/buildQueryString.util";
import type { PaginatedRequest, PaginatedResponse } from "@/types/types";
import type {
  JobListingSchema,
  CreateJobListingFormData,
  UpdateJobListingFormData,
} from "@/schemas/job-listing.schema";

export const getJobListings = async ({
  search,
  page,
  limit,
}: PaginatedRequest): Promise<PaginatedResponse<JobListingSchema>> => {
  const queryString = buildQueryString({ search, page, limit });

  const response = await axiosClient.get(`/job-listings${queryString ? `?${queryString}` : ""}`);

  return response.data;
};

export const getJobListing = async (id: string) => {
  const response = await axiosClient.get(`/job-listings/${id}`);

  return response.data;
};

export const createJobListing = async (data: CreateJobListingFormData): Promise<JobListingSchema> => {
  const response = await axiosClient.post(`/job-listings`, data);

  return response.data;
};

export const updateJobListing = async (id: string, data: UpdateJobListingFormData): Promise<JobListingSchema> => {
  const response = await axiosClient.patch(`/job-listings/${id}`, data);

  return response.data;
};

export const deleteJobListing = async (id: string): Promise<JobListingSchema> => {
  const response = await axiosClient.delete(`/job-listings/${id}`);

  return response.data;
};
