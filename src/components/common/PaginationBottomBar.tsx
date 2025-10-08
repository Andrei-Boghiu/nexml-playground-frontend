import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export type PaginationBottomBarProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationBottomBar({ page, totalPages, onPageChange }: PaginationBottomBarProps) {
  if (totalPages <= 1) return null;

  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  return (
    <Pagination className="mt-4 mb-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(1, page - 1))}
            aria-disabled={page === 1}
            className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {visiblePages.map((p, idx) => (
          <PaginationItem key={p}>
            {idx > 0 && visiblePages[idx - 1] !== p - 1 && <PaginationEllipsis />}
            <PaginationLink isActive={p === page} onClick={() => onPageChange(p)} className="cursor-pointer">
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            aria-disabled={page === totalPages}
            className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
