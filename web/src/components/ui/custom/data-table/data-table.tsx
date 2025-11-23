import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FilterType } from "@/shared/enums";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type ColumnPinningState,
  type ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Edit3Icon,
  ListPlusIcon,
  RefreshCwIcon,
  Trash2Icon,
} from "lucide-react";
import { Fragment, type ReactNode, useState } from "react";
import { Button } from "../../button";
import { CEmptyData, type CEmptyDataProps } from "../cempty-data";
import { CLoadingData } from "../cloading-data";
import DataTableSheet from "./data-sheet";
import DataTableDeleteDialog from "./delete-dialog";
import { DataTableFilters } from "./filters";
import { DataTablePagination } from "./pagination";

interface TableButtons<TData> {
  isDataLoading: boolean;
  refreshFunction: () => void;
  canAdd?: boolean;
  addForm?: (onSubmit: () => void, onCancel: () => void) => ReactNode;
  addSheet?: {
    title: string;
    description: string;
  };
  canEdit?: boolean;
  editForm?: (
    row: TData,
    onSubmit: () => void,
    onCancel: () => void
  ) => ReactNode;
  editSheet?: {
    title: string;
    description: string;
  };
  canDelete?: boolean;
  deleteFunction?: (ids: string[]) => Promise<void>;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  enableMasterDetail?: boolean;
  masterDetail?: (row: TData) => ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isDataLoading,
  enableMasterDetail = false,
  masterDetail,
  appRoute,
  addDataButtonText,
  canAccessMoreButton = false,
  refreshFunction,
  canAdd = false,
  addForm,
  addSheet,
  canEdit = false,
  editForm,
  editSheet,
  canDelete = false,
  deleteFunction,
}: DataTableProps<TData, TValue> & TableButtons<TData> & CEmptyDataProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({
    left: [],
    right: [],
  });
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [openAddSheet, setOpenAddSheet] = useState(false);
  const [openEditSheet, setOpenEditSheet] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnPinning,
      expanded,
    },
    initialState: {
      columnPinning: {
        left: ["select", "actions", "title"],
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    getExpandedRowModel: getExpandedRowModel(),
    onExpandedChange: setExpanded,
  });

  function refreshTable() {
    table.resetRowSelection();
    refreshFunction();
  }

  return (
    <div className="space-y-5 py-2">
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          {canAdd && addForm && (
            <Button size={"sm"} onClick={() => setOpenAddSheet(true)}>
              <ListPlusIcon />
              <p>Ajouter</p>
            </Button>
          )}

          {canEdit && editForm && (
            <Button
              size={"sm"}
              onClick={() => setOpenEditSheet(true)}
              disabled={Object.keys(rowSelection).length !== 1}
            >
              <Edit3Icon />
              <p>Éditer</p>
            </Button>
          )}

          {canDelete && deleteFunction && (
            <Button
              variant={"destructive"}
              size={"sm"}
              onClick={() => setOpenDialog(true)}
              disabled={!table.getIsSomeRowsSelected()}
            >
              <Trash2Icon />
              <p>Supprimer</p>
            </Button>
          )}
        </div>

        <Button size={"sm"} onClick={refreshTable}>
          <RefreshCwIcon />
          <p>Rafraîchir</p>
        </Button>
      </div>

      <div className="rounded-md border border-white overflow-x-auto scroll-smooth">
        <Table className="min-w-full bg-background">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} data-col={header.column.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={`filter-${headerGroup.id}`}>
                  {headerGroup.headers.map((header) => {
                    let filterType: FilterType = "text";
                    let selectOptions: string[] = [];

                    if (header.column.columnDef.meta) {
                      const metaData = header.column.columnDef.meta as any;

                      filterType = metaData.filterType
                        ? (metaData.filterType as FilterType)
                        : filterType;

                      if (filterType === "select" && metaData.options) {
                        selectOptions = Array.from(metaData.options);
                      }
                    }

                    return (
                      <TableHead
                        key={`filter-${header.id}`}
                        data-col={header.column.id}
                      >
                        {header.column.getCanFilter() && (
                          <DataTableFilters
                            table={table}
                            columnId={header.column.id}
                            filterType={filterType}
                            selectOptions={selectOptions}
                          />
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {isDataLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <CLoadingData appRoute={appRoute} />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} data-col={cell.column.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {enableMasterDetail && row.getIsExpanded() && (
                    <TableRow className="bg-base-200/30 transition-all duration-300 ease-in-out">
                      <TableCell colSpan={columns.length + 1}>
                        {masterDetail && masterDetail(row.original)}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <CEmptyData
                    appRoute={appRoute}
                    addDataButtonText={addDataButtonText}
                    addDataButtonOnClick={() => setOpenAddSheet(true)}
                    canAccessMoreButton={canAccessMoreButton}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />

      {addForm && addSheet && (
        <DataTableSheet
          openSheet={openAddSheet}
          onOpenChange={setOpenAddSheet}
          sheetTitle={addSheet.title}
          sheetDescription={addSheet.description}
        >
          {addForm(
            () => {
              setOpenAddSheet(false);
              refreshTable();
            },
            () => setOpenAddSheet(false)
          )}
        </DataTableSheet>
      )}

      {table.getIsSomePageRowsSelected() && (
        <>
          {editForm && editSheet && (
            <DataTableSheet
              openSheet={openEditSheet}
              onOpenChange={setOpenEditSheet}
              sheetTitle={editSheet.title}
              sheetDescription={editSheet.description}
            >
              {editForm(
                table.getRow(Object.keys(rowSelection)[0]).original,
                () => {
                  setOpenEditSheet(false);
                  refreshTable();
                },
                () => setOpenEditSheet(false)
              )}
            </DataTableSheet>
          )}

          {deleteFunction && (
            <DataTableDeleteDialog
              openDialog={openDialog}
              onOpenChange={(open) => {
                if (isUpdating) return;
                setOpenDialog(open);
              }}
              isUpdating={isUpdating}
              deleteFunction={async () => {
                setIsUpdating(true);
                let idsToDelete = Object.keys(rowSelection).map(
                  (key) => (table.getRow(key).original as any).id as string
                );

                await deleteFunction(idsToDelete);
                table.resetRowSelection();
                setIsUpdating(false);
                setOpenDialog(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
