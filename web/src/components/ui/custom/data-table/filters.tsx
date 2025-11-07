import type { FilterType } from "@/shared/enums";
import type { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../input-group";

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
  columnId: string;
}

function NumberFilter<TData>({
  table,
  columnId,
}: DataTableFiltersProps<TData>) {
  return (
    <InputGroup className="min-w-[100px] border-none shadow-none h-full">
      <InputGroupInput
        type="number"
        value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
        onChange={(e) => {
          return table.getColumn(columnId)?.setFilterValue(e.target.value);
        }}
        placeholder="0"
        className="!px-1 !text-xs"
      />
    </InputGroup>
  );
}

function BooleanFilter<TData>({
  table,
  columnId,
}: DataTableFiltersProps<TData>) {
  return (
    <select
      className="border rounded px-1 py-0.5 text-xs"
      value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
      onChange={(e) =>
        table.getColumn(columnId)?.setFilterValue(e.target.value === "true")
      }
    >
      <option value="">Tous</option>
      <option value="true">Vrai</option>
      <option value="false">Faux</option>
    </select>
  );
}

function DateFilter<TData>({ table, columnId }: DataTableFiltersProps<TData>) {
  return (
    <InputGroup className="min-w-[100px] border-none shadow-none h-full">
      <InputGroupInput
        type="date"
        value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
        onChange={(e) =>
          table.getColumn(columnId)?.setFilterValue(e.target.value)
        }
        className="!px-1 !text-xs"
      />
    </InputGroup>
  );
}

function SelectFilter<TData>({
  table,
  columnId,
  selectOptions,
}: DataTableFiltersProps<TData> & {
  selectOptions: string[];
}) {
  return (
    <select
      className="border rounded px-1 py-0.5 text-xs"
      value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
      onChange={(e) =>
        table.getColumn(columnId)?.setFilterValue(e.target.value)
      }
    >
      <option value="">All</option>
      {selectOptions.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function TextFilter<TData>({ table, columnId }: DataTableFiltersProps<TData>) {
  return (
    <InputGroup className="min-w-[100px] border-none shadow-none h-full">
      <InputGroupInput
        placeholder="Rechercher..."
        value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(columnId)?.setFilterValue(event.target.value)
        }
        className="!px-1 !text-xs"
      />
      <InputGroupAddon className="pl-1 py-0">
        <Search size={5} />
      </InputGroupAddon>
    </InputGroup>
  );
}

export function DataTableFilters<TData>({
  table,
  columnId,
  selectOptions,
  filterType,
}: DataTableFiltersProps<TData> & {
  filterType: FilterType;
  selectOptions?: string[];
}) {
  switch (filterType) {
    case "number":
      return <NumberFilter table={table} columnId={columnId} />;
    case "boolean":
      return <BooleanFilter table={table} columnId={columnId} />;
    case "date":
      return <DateFilter table={table} columnId={columnId} />;
    case "select":
      return (
        selectOptions &&
        selectOptions.length > 0 && (
          <SelectFilter
            table={table}
            columnId={columnId}
            selectOptions={selectOptions}
          />
        )
      );
    default:
      return <TextFilter table={table} columnId={columnId} />;
  }
}
