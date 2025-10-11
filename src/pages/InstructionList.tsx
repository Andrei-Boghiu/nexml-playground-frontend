import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { createInstruction, getInstructions } from "@/services/instruction.service";

import InfoActionBar from "@/components/common/InfoActionBar";
import ContentCardGrid from "@/components/common/ContentCardGrid";
import PaginationBottomBar from "@/components/common/PaginationBottomBar";
import CreateItemSideSheet, { type NewItemField } from "@/components/common/CreateItemSideSheet";

import type { PaginatedRequest } from "@/types/types";
import { createInstructionSchema, type CreateInstructionFormData } from "@/schemas/instruction.schema";

const configFields: Record<keyof CreateInstructionFormData, NewItemField> = {
  name: {
    type: "input",
    placeholder: "Forgery deep check",
  },
  content: {
    type: "textarea",
    placeholder: "Look for forgery indicators such as... and decrease the overall scoring.",
  },
};

export default function InstructionList() {
  const [isCreatingItem, setIsCreatingItem] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);

  const [isAddSheetOpen, setIsAddSheetOpen] = useState<boolean>(false);

  const {
    data: instructionList,
    refetch,
    dataUpdatedAt,
    error,
    isError,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["instructions", { search: debouncedSearch, page, limit }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getInstructions(params as PaginatedRequest);
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

      <ContentCardGrid data={instructionList?.data} isLoading={isLoading} redirectEntity="instructions" />

      <PaginationBottomBar
        totalPages={instructionList?.meta.totalPages || 0}
        page={page}
        onPageChange={handlePageChange}
      />

      <CreateItemSideSheet
        queryKeyToInvalidate="instructions"
        title="Create New Instruction"
        description="Create a new instruction item by filling in the form below. Click save when you're done."
        onSubmit={createInstruction}
        isLoading={isCreatingItem}
        setIsLoading={setIsCreatingItem}
        isOpen={isAddSheetOpen}
        setIsOpen={setIsAddSheetOpen}
        fields={configFields}
        schema={createInstructionSchema}
      />
    </>
  );
}
