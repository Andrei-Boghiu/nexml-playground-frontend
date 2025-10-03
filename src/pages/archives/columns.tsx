import { type ColumnDef } from "@tanstack/react-table";
import { type ArchiveSchema } from "@/schemas/archive.schema";

import { Button } from "@/components/ui/button";
import { EditIcon, TrashIcon } from "lucide-react";

export const columns: ColumnDef<ArchiveSchema>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => console.log("Edit", row.original)}>
          <EditIcon />
        </Button>
        <Button variant="destructive" size="sm" onClick={() => console.log("Delete", row.original)}>
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
