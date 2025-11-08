import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import InfoActionBar from "@/components/common/InfoActionBar";
import ContentCardGrid from "@/components/common/ContentCardGrid";
import PaginationBottomBar from "@/components/common/PaginationBottomBar";
import CreateItemSideSheet, { type NewItemField } from "@/components/common/CreateItemSideSheet";

import type { PaginatedRequest } from "@/types/types";
import { createJobListingSchema, type CreateJobListingFormData } from "@/schemas/job-listing.schema";
import { createJobListing, getJobListings } from "@/services/job-listing.service";

const configFields: Record<keyof CreateJobListingFormData, NewItemField> = {
  title: {
    type: "input",
    placeholder: "Senior Sails Representative",
  },
  content: {
    type: "textarea",
    placeholder: "Professional with +10 years of experience in world wide...",
  },
};

export default function JobListingList() {
  const [isCreatingItem, setIsCreatingItem] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);

  const [isAddSheetOpen, setIsAddSheetOpen] = useState<boolean>(false);

  const {
    data: jobListingList,
    refetch,
    dataUpdatedAt,
    error,
    isError,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["job-listings", { search: debouncedSearch, page, limit }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getJobListings(params as PaginatedRequest);
    },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 500); // ⏱ debounce delay (ms)

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (isError) {
      toast.error("Error", {
        description: error.message,
      });
    }
  }, [error, isError]);

  async function handlePageChange(newPage: number) {
    if (newPage === page) return;

    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <InfoActionBar
        search={search}
        setSearch={setSearch}
        isCreatingItem={isCreatingItem}
        setIsAddSheetOpen={setIsAddSheetOpen}
        query={{ dataUpdatedAt, refetch, isRefetching, isLoading }}
      />

      <ContentCardGrid data={jobListingList?.data} isLoading={isLoading} redirectEntity="job-listings" />

      <PaginationBottomBar
        totalPages={jobListingList?.meta.totalPages || 0}
        page={page}
        onPageChange={handlePageChange}
      />

      <CreateItemSideSheet
        queryKeyToInvalidate="job-listings"
        title="Create New Job Listing"
        description="Create a new job listing item by filling in the form below. Click save when you're done."
        onSubmit={createJobListing}
        isLoading={isCreatingItem}
        setIsLoading={setIsCreatingItem}
        isOpen={isAddSheetOpen}
        setIsOpen={setIsAddSheetOpen}
        fields={configFields}
        schema={createJobListingSchema}
      />
    </>
  );
}
