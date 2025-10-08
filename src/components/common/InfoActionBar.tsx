import type { Dispatch, SetStateAction } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import { RefreshCcw, Plus } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import LastUpdatedAtBadge from "@/components/common/LastUpdatedAtBadge";
import { Command, CommandInput } from "@/components/ui/command";

export type InfoActionBarProps = {
  setIsAddSheetOpen: Dispatch<SetStateAction<boolean>>;
  setSearch: Dispatch<SetStateAction<string>>;
  isCreatingItem: boolean;
  search: string;
  query: Pick<UseQueryResult<unknown, unknown>, "dataUpdatedAt" | "refetch" | "isRefetching" | "isLoading">;
};

export default function InfoActionBar({
  query,
  setIsAddSheetOpen,
  isCreatingItem,
  setSearch,
  search,
}: InfoActionBarProps) {
  const { dataUpdatedAt, isLoading, isRefetching, refetch } = query;

  return (
    <div className="flex items-center justify-between m-4">
      <div className="flex gap-2">
        <Command>
          <CommandInput
            placeholder="Search items by name..."
            className="w-2xs"
            value={search}
            onValueChange={(value) => setSearch(value)}
          />
        </Command>

        <LastUpdatedAtBadge dataUpdatedAt={dataUpdatedAt} />

        <Button variant="secondary" onClick={() => refetch()} disabled={isRefetching || isLoading}>
          {isRefetching || isLoading ? <Spinner /> : <RefreshCcw />}
        </Button>
      </div>

      <ButtonGroup>
        <Button variant="default" onClick={() => setIsAddSheetOpen((v) => !v)} disabled={isCreatingItem}>
          {isCreatingItem && <Spinner className="mr-1 inline-block" />}
          {isCreatingItem ? (
            "Creating..."
          ) : (
            <>
              Create <Plus />
            </>
          )}
        </Button>
      </ButtonGroup>
    </div>
  );
}
