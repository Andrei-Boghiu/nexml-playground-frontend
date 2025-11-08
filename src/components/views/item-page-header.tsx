import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { TypographyH3 } from "@/components/ui/typography";
import { Check, X, Edit, Trash2, RefreshCcw } from "lucide-react";

import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import ConfirmDeleteModal from "../common/confirm-delete-modal";

export type ItemPageHeaderProps = {
  title: string;
  onSave: (newTitle: string) => Promise<void>;
  onDelete: () => void;
  isSaving: boolean;
  isDeleting: boolean;
  isFetching: boolean;
  refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>;
};

export default function ItemPageHeader({
  title,
  onSave,
  onDelete,
  isDeleting,
  isSaving,
  isFetching,
  refetch,
}: ItemPageHeaderProps) {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [localName, setLocalName] = useState<string>("");

  useEffect(() => {
    if (!isEditing && localName !== title) setLocalName(title);
  }, [name, isEditing]);

  const handleSave = async () => {
    if (isSaving) return;

    await onSave(localName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalName(title);
    setIsEditing(false);
  };

  const isActionDisabled = isDeleting || isFetching || isSaving;

  return (
    <div className="flex items-center justify-between gap-2">
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1">
          <Input
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            disabled={isSaving}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="flex-1"
            autoFocus
          />
          <Button onClick={handleSave} disabled={isSaving || localName === title} size="sm">
            {isSaving ? <Spinner className="mr-1 inline-block" /> : <Check />}
          </Button>
          <Button onClick={handleCancel} disabled={isSaving} variant="outline" size="sm">
            <X />
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TypographyH3 className="flex items-center gap-3">
                <span className={`${isSaving ? "opacity-60 italic" : ""}`}>{title}</span>
                {isSaving && <Spinner className="inline align-middle relative top-[4px]" />}
              </TypographyH3>
            </div>
          </div>
          <Button
            onClick={() => refetch()}
            disabled={isActionDisabled}
            variant="outline"
            size="sm"
            aria-label="Refresh item"
          >
            {isActionDisabled ? <Spinner /> : <RefreshCcw aria-hidden="true" />}
          </Button>
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            disabled={isActionDisabled}
            aria-label="Edit item name"
          >
            <Edit aria-hidden="true" />
          </Button>
          <Button
            onClick={() => setDeleteModalOpen(true)}
            variant="destructive"
            size="sm"
            disabled={isActionDisabled}
            aria-label="Delete item"
          >
            {isDeleting ? <Spinner className="mr-1 inline-block" /> : <Trash2 aria-hidden="true" />}
          </Button>
        </>
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={onDelete}
        isDeleting={isDeleting}
        message={
          <span className="space-y-4">
            <span className="block">
              Are you sure you want to delete the "<strong>{title}</strong>" item?
              <br />
            </span>

            <span className="block">Note: This action cannot be undone!</span>
          </span>
        }
      />
    </div>
  );
}
