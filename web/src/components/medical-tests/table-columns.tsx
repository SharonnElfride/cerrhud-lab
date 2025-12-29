import { displayUserName } from "@/helpers/admin-by-id-helper";
import type { Tables } from "@/lib/supabase/supabase";
import { ViewMedicalTest } from "@/pages/medicalTests/view-medical-test";
import { SharedEntityData } from "@/shared/entity-data";
import { MedicalTestFormFieldsInfo } from "@/shared/form-fields-info";
import { cFormatDate } from "@/utils/formatting";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import DataTableViewDialog from "../ui/custom/data-table/view-dialog";

export const MedicalTestsColumns = (
  isUser: boolean,
  enableMasterDetail?: boolean
): ColumnDef<Tables<"medical_tests">>[] => [
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
    accessorKey: "acronym",
    header: MedicalTestFormFieldsInfo.acronym.label,
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: MedicalTestFormFieldsInfo.title.label,
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <DataTableViewDialog
          title={row.original.title}
          description={row.original.description}
          dialogContentClassName={
            "md:!max-w-5xl md:h-[70vh] overflow-x-hidden flex flex-col"
          }
        >
          <ViewMedicalTest displayHeader={false} medicalTest={row.original} />
        </DataTableViewDialog>
      );
    },
  },
  {
    accessorKey: "price",
    header: MedicalTestFormFieldsInfo.price.label,
    filterFn: "includesString",
    meta: { filterType: "number" },
  },
  {
    accessorKey: "keywords",
    header: MedicalTestFormFieldsInfo.keywords.label,
    cell: ({ row }) => {
      return (
        <div className="w-[350px] flex flex-wrap items-center gap-1">
          {row.original.keywords?.map((kw) => (
            <Badge
              key={kw.toKeyCase()}
              variant={"outline"}
              className="capitalize"
            >
              {kw}
            </Badge>
          ))}
        </div>
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    accessorKey: "updated_at",
    header: SharedEntityData.updatedAt,
    cell: ({ row }) => {
      return (
        row.original.updated_at && <p>{cFormatDate(row.original.updated_at)}</p>
      );
    },
    meta: { filterType: "date" },
  },
  {
    accessorKey: "updated_by",
    header: SharedEntityData.updatedBy,
    cell: ({ row }) => {
      return (
        row.original.updated_by && (
          <p>{displayUserName(row.original.updated_by)}</p>
        )
      );
    },
    enableColumnFilter: false,
    enableSorting: false,
    meta: { display: !isUser },
  },
];
