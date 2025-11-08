import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import InfoActionBar from "@/components/common/InfoActionBar";
import ContentCardGrid from "@/components/common/ContentCardGrid";
import PaginationBottomBar from "@/components/common/PaginationBottomBar";
import CreateItemSideSheet, { type NewItemField } from "@/components/common/CreateItemSideSheet";

import type { PaginatedRequest } from "@/types/types";
import { createArchive, getArchives } from "@/services/archive.service";
import { createArchiveSchema, type CreateArchiveFormData } from "@/schemas/archive.schema";

const configFields: Record<keyof CreateArchiveFormData, NewItemField> = {
  title: {
    type: "input",
    placeholder: "Archive: ACME-HR Technical Interviews Specialist (L3)",
  },
  description: {
    type: "textarea",
    placeholder:
      "This is the archive associated with the 2025Q1 hiring process for a Technical Interviews Specialist (L3) for the ACME-HR company.",
  },
};

export default function ArchiveList() {
  const [isCreatingItem, setIsCreatingItem] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);

  const [isAddSheetOpen, setIsAddSheetOpen] = useState<boolean>(false);

  const {
    data: archiveList,
    refetch,
    dataUpdatedAt,
    error,
    isError,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: ["archives", { search: debouncedSearch, page, limit }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getArchives(params as PaginatedRequest);
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

      <ContentCardGrid data={archiveList?.data} isLoading={isLoading} redirectEntity="archives" />

      <PaginationBottomBar totalPages={archiveList?.meta.totalPages || 0} page={page} onPageChange={handlePageChange} />

      <CreateItemSideSheet
        queryKeyToInvalidate="archives"
        title="Create New Archive"
        description="Create a new archive by filling in the form below. Click save when you're done."
        onSubmit={createArchive}
        isLoading={isCreatingItem}
        setIsLoading={setIsCreatingItem}
        isOpen={isAddSheetOpen}
        setIsOpen={setIsAddSheetOpen}
        fields={configFields}
        schema={createArchiveSchema}
      />
    </>
  );
}
