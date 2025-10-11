import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import type { ReactNode } from "react";

export type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  message?: ReactNode;
};

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  message,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription className="my-2">
            {message || "Are you sure you want to delete this item? This action cannot be undone."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            onClick={() => {
              onClose();
              onConfirm();
            }}
          >
            {isDeleting ? <Spinner className="mr-1 inline-block" /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
