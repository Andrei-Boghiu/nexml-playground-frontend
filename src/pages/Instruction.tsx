import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getInstruction, updateInstruction, deleteInstruction } from "@/services/instruction.service";
import { Spinner } from "@/components/ui/spinner";

import ItemContentEditor from "@/components/views/item-content-editor";
import ItemPageHeader from "@/components/views/item-page-header";

import type { UpdateInstructionFormData } from "@/schemas/instruction.schema";
import LastUpdatedAtBadge from "@/components/common/LastUpdatedAtBadge";
import type { ApiError } from "@/types/types";
import { Badge } from "@/components/ui/badge";

export default function Instruction() {
  const [content, setContent] = useState<string>("");
  const [name, setName] = useState<string>("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>() as { id: string };

  const queryKey = ["instructions", id];

  const {
    data: instruction,
    isLoading,
    dataUpdatedAt,
    isFetching,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getInstruction(id!),
    enabled: Boolean(id),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (instruction) {
      setName(instruction.name);
      setContent(instruction.content);
    }
  }, [instruction]);

  const { mutate: saveInstruction, isPending: isSaving } = useMutation({
    mutationFn: (updated: UpdateInstructionFormData) => updateInstruction(id!, updated),
    onSuccess: (updated) => {
      toast.success("Instruction updated successfully!");
      queryClient.setQueryData(queryKey, updated);
    },
    onError: (err: ApiError) => {
      const description = err?.response?.data?.error || err.message;
      toast.error("Error updating instruction", { description });
    },
  });

  const { mutate: deleteInstr, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteInstruction(id!),
    onSuccess: () => {
      toast.success("Instruction deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["instructions"] });
      navigate("/instructions");
    },
    onError: (err: ApiError) => {
      const description = err?.response?.data?.error || err.message;
      toast.error("Error deleting instruction", { description });
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
        name={name}
        isSaving={isSaving}
        isDeleting={isDeleting}
        onDelete={deleteInstr}
        onSave={async (newName) => saveInstruction({ name: newName })}
        refetch={refetch}
        isFetching={isFetching}
      />

      <div className="flex flex-col gap-4">
        <Badge variant="secondary">Created at: {new Date(instruction?.createdAt).toLocaleString()}</Badge>
        <Badge variant="secondary">Updated at: {new Date(instruction?.updatedAt).toLocaleString()}</Badge>
        <LastUpdatedAtBadge dataUpdatedAt={dataUpdatedAt} />
      </div>

      <ItemContentEditor
        content={content}
        isSaving={isSaving}
        onSave={async (newContent) => saveInstruction({ content: newContent })}
      />
    </div>
  );
}
