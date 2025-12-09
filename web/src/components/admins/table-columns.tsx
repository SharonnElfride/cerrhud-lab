import { displayUserName } from "@/helpers/admin-by-id-helper";
import { displayUserRole } from "@/helpers/admin-role-helper";
import type { Tables } from "@/lib/supabase/supabase";
import { SharedEntityData } from "@/shared/entity-data";
import { AdminFormFieldsInfo } from "@/shared/form-fields-info";
import { cFormatDate } from "@/utils/formatting";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import CDisplayBoolean from "../ui/custom/cboolean-display";

export const AdminsColumns = (
  enableMasterDetail?: boolean
): ColumnDef<Tables<"profiles">>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableColumnFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        enableMasterDetail && (
          <Button
            variant="secondary"
            size="icon-sm"
            onClick={() => row.toggleExpanded()}
            className="size-6 p-1"
          >
            <ChevronDown
              className={`transition-transform ${
                row.getIsExpanded() ? "rotate-180" : ""
              }`}
            />
          </Button>
        )
      );
    },
  },
  {
    accessorKey: "avatar",
    header: AdminFormFieldsInfo.avatar.label,
    cell: ({ row }) => {
      return (
        <Avatar>
          {/* AvatarImage + full screen */}
          <AvatarImage src={row.original.avatar ?? undefined} alt="avatar" />
          <AvatarFallback
            style={{
              backgroundColor:
                row.original.profile_color ?? "var(--color-primary)",
              color: "white",
              fontWeight: 500,
            }}
          >
            {row.original.firstname?.charAt(0) ?? "X"}
          </AvatarFallback>
        </Avatar>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "firstname",
    header: AdminFormFieldsInfo.firstname.label,
    enableSorting: false,
  },
  {
    accessorKey: "lastname",
    header: AdminFormFieldsInfo.lastname.label,
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: AdminFormFieldsInfo.email.label,
    enableSorting: false,
  },
  {
    accessorKey: "email_change_pending",
    header: AdminFormFieldsInfo.email_change_pending.label,
    cell: ({ row }) => {
      return <CDisplayBoolean bool={row.original.email_change_pending} />;
    },
    enableSorting: false,
    meta: { filterType: "boolean" },
  },
  {
    accessorKey: "role",
    header: AdminFormFieldsInfo.role.label,
    cell: ({ row }) => {
      return <p>{displayUserRole(row.original.role)}</p>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "created_at",
    header: SharedEntityData.createdAt,
    cell: ({ row }) => {
      return (
        row.original.created_at && <p>{cFormatDate(row.original.created_at)}</p>
      );
    },
    meta: { filterType: "date" },
  },
  {
    accessorKey: "created_by",
    header: SharedEntityData.createdBy,
    cell: ({ row }) => {
      return (
        row.original.created_by && (
          <p>{displayUserName(row.original.created_by)}</p>
        )
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
];
