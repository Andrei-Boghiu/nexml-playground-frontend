import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { deletePolicy, getPolicy, updatePolicy } from "@/services/policy.service";

import LastUpdatedAtBadge from "@/components/common/LastUpdatedAtBadge";
import ItemContentEditor from "@/components/views/item-content-editor";
import ItemPageHeader from "@/components/views/item-page-header";

import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

import type { UpdatePolicyFormData } from "@/schemas/policy.schema";
import type { ApiError } from "@/types/types";

export default function Policy() {
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>() as { id: string };

  const queryKey = ["policies", id];

  const {
    data: policy,
    isLoading,
    dataUpdatedAt,
    isFetching,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getPolicy(id!),
    enabled: Boolean(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (policy) {
      setTitle(policy.title);
      setContent(policy.content);
    }
  }, [policy]);

  const { mutate: savePolicy, isPending: isSaving } = useMutation({
    mutationFn: (updated: UpdatePolicyFormData) => updatePolicy(id!, updated),
    onSuccess: (updated) => {
      toast.success("Policy updated successfully!");
      queryClient.setQueryData(queryKey, updated);
    },
    onError: (err: ApiError) => {
      const description = err?.response?.data?.error || err.message;
      toast.error("Error updating policy", { description });
    },
  });

  const { mutate: deletePolicyMutate, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePolicy(id!),
    onSuccess: () => {
      toast.success("Policy deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      navigate("/policies");
    },
    onError: (err: ApiError) => {
      const description = err?.response?.data?.error || err.message;
      toast.error("Error deleting policy", { description });
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
        onDelete={deletePolicyMutate}
        onSave={async (title) => savePolicy({ title })}
        refetch={refetch}
        isFetching={isFetching}
      />

      <div className="flex flex-col gap-4">
        <Badge variant="secondary">Created at: {new Date(policy?.createdAt).toLocaleString()}</Badge>
        <Badge variant="secondary">Updated at: {new Date(policy?.updatedAt).toLocaleString()}</Badge>
        <LastUpdatedAtBadge dataUpdatedAt={dataUpdatedAt} />
      </div>

      <ItemContentEditor
        content={content}
        isSaving={isSaving}
        onSave={async (newContent) => savePolicy({ content: newContent })}
      />
    </div>
  );
}
