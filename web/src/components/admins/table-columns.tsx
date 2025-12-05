import type { Tables } from "@/lib/supabase/supabase";
import { type ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

/*
{
  avatar: string | null;
  created_at: string | null;
  created_by: string | null;
  email: string;
  first_name: string;
  hidden: boolean | null;
  id: string;
  permissions: Json;
  profile_color: string | null;
  role: Database["public"]["Enums"]["user_role"];
  surname: string | null;
}
*/

export const AdminsColumns = (
  isUser: boolean,
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
    accessorKey: "first_name",
    header: "FN",
    enableSorting: false,
  },
  {
    accessorKey: "surname",
    header: "SN",
    enableSorting: false,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
  },
  {
    accessorKey: "role",
    header: "role",
    enableSorting: false,
  },
  // {
  //   accessorKey: "title",
  //   header: "Titre",
  //   enableSorting: false,
  //   cell: ({ row }) => {
  //     return (
  //       <DataTableViewDialog
  //         title={row.original.title}
  //         description={row.original.description}
  //         dialogContentClassName={
  //           "md:!max-w-5xl md:h-[70vh] overflow-x-hidden flex flex-col"
  //         }
  //       >
  //         <ViewMedicalTest displayHeader={false} medicalTest={row.original} />
  //       </DataTableViewDialog>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "price",
  //   header: "Prix",
  //   filterFn: "includesString",
  //   meta: { filterType: "number" },
  // },
  // {
  //   accessorKey: "keywords",
  //   header: "Mots clés",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="w-[350px] flex flex-wrap items-center gap-1">
  //         {row.original.keywords?.map((kw) => (
  //           <Badge
  //             key={kw.toKeyCase()}
  //             variant={"outline"}
  //             className="capitalize"
  //           >
  //             {kw}
  //           </Badge>
  //         ))}
  //       </div>
  //     );
  //   },
  //   enableColumnFilter: false,
  //   enableSorting: false,
  // },
];
