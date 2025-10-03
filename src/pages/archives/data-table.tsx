import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getArchives } from "../../services/archive.service";
import CreateArchiveModal from "../../components/CreateArchiveModal";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { columns } from "./columns";

export default function ArchiveDataTable() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(15);

  const {
    data: archives,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["archives", { page, limit }],
    queryFn: () => getArchives({ page, limit }),
  });

  const totalPages = archives?.meta?.totalPages || 1;
  const tableData = archives?.data ?? [];

  return (
    <div className="mx-auto mt-4 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <Button size="sm" onClick={() => refetch()} disabled={isLoading || isRefetching}>
          Refetch
        </Button>
        <Button size="sm" onClick={() => setShowCreateForm(true)}>
          Create Archive
        </Button>
      </div>

      {showCreateForm && (
        <dialog open={showCreateForm} onClose={() => setShowCreateForm(false)}>
          <CreateArchiveModal />
        </dialog>
      )}

      {isLoading || isRefetching ? (
        <div className="text-center py-6">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-500 py-6">Error fetching archives</div>
      ) : tableData.length === 0 ? (
        <div className="text-center py-6">No archives found</div>
      ) : (
        <DataTable columns={columns} data={tableData} />
      )}

      <div className="flex justify-center mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                aria-disabled={page <= 1}
                className={page <= 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            <span className="px-4 py-2 text-sm">
              Page {page} of {totalPages}
            </span>
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                aria-disabled={page >= totalPages}
                className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
