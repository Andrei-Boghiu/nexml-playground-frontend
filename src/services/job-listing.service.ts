import axiosClient from "../lib/axios.client";
import type {
  JobListingSchema,
  CreateJobListingFormData,
  UpdateJobListingFormData,
} from "../schemas/job-listing.schema";
import type { PaginatedResponse } from "../types/types";

export const getJobListings = async (): Promise<PaginatedResponse<JobListingSchema>> => {
  const response = await axiosClient.get("/job-listings");

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
