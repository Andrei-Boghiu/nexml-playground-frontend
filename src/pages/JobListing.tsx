import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

import { deleteJobListing, getJobListing, updateJobListing } from "@/services/job-listing.service";

import LastUpdatedAtBadge from "@/components/common/LastUpdatedAtBadge";
import ItemContentEditor from "@/components/views/item-content-editor";
import ItemPageHeader from "@/components/views/item-page-header";
import { Badge } from "@/components/ui/badge";

import type { UpdateJobListingFormData } from "@/schemas/job-listing.schema";
import type { ApiError } from "@/types/types";

export default function JobListing() {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>() as { id: string };

  const queryKey = ["job-listings", id];

  const {
    data: jobListing,
    isLoading,
    dataUpdatedAt,
    isFetching,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getJobListing(id!),
    enabled: Boolean(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (jobListing) {
      setTitle(jobListing.title);
      setContent(jobListing.content);
    }
  }, [jobListing]);

  const { mutate: saveJobListing, isPending: isSaving } = useMutation({
    mutationFn: (updated: UpdateJobListingFormData) => updateJobListing(id!, updated),
    onSuccess: (updated) => {
      toast.success("Job listing updated successfully!");
      queryClient.setQueryData(queryKey, updated);
    },
    onError: (err: ApiError) => {
      const description = err?.response?.data?.error || err.message;
      toast.error("Error updating job listing", { description });
    },
  });

  const { mutate: deleteJobListingMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteJobListing(id!),
    onSuccess: () => {
      toast.success("Job listing deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["job-listings"] });
      navigate("/job-listings");
    },
    onError: (err: ApiError) => {
      const description = err?.response?.data?.error || err.message;
      toast.error("Error deleting job listing", { description });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Spinner scale={148} />
      </div>
    );
  }

  if (isError) {
    const errMsg = (error as ApiError).response?.data?.error || error?.message;

    return (
      <div className="text-center text-red-500 py-16">
        <p>Error: {errMsg}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 m-3.5">
      <ItemPageHeader
        title={title}
        isSaving={isSaving}
        isDeleting={isDeleting}
        onDelete={deleteJobListingMutate}
        onSave={async (title) => saveJobListing({ title })}
        refetch={refetch}
        isFetching={isFetching}
      />

      <div className="flex flex-col gap-4">
        <Badge variant="secondary">Created at: {new Date(jobListing?.createdAt).toLocaleString()}</Badge>
        <Badge variant="secondary">Updated at: {new Date(jobListing?.updatedAt).toLocaleString()}</Badge>
        <LastUpdatedAtBadge dataUpdatedAt={dataUpdatedAt} />
      </div>

      <ItemContentEditor
        content={content}
        isSaving={isSaving}
        onSave={async (content) => saveJobListing({ content })}
      />
    </div>
  );
}
