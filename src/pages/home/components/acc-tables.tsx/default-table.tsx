import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";

import SortUpIcon from "@/components/ui/icons/sort-up-icon";
import SortDownIcon from "@/components/ui/icons/sort-down-icon";
import { cn } from "@/lib/utils";

type DataTableProps<TData extends object> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  tableClassName?: string;
  wrapperClassName?: string;
};

export function DefaultTable<TData extends object>({
  data,
  columns,
  tableClassName,
  wrapperClassName,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),

    enableSortingRemoval: false, // 🔥 prevents "3rd click" issue
  });

  return (
    <div className={cn("w-full overflow-x-auto", wrapperClassName)}>
      <table className={cn("w-full border-collapse", tableClassName)}>
        <thead className="bg-mt-gray-250 pt-3">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const isSorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className={cn(
                      "px-3 py-2 text-left text-sm font-medium",
                      canSort && "cursor-pointer select-none"
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {canSort && (
                        <>
                          {isSorted === "asc" && (
                            <SortUpIcon className="text-neutral-600" />
                          )}

                          {isSorted === "desc" && (
                            <SortDownIcon className="text-neutral-600" />
                          )}

                          {!isSorted && (
                            <div className="ml-1 flex flex-col gap-1.5">
                              <SortUpIcon className="text-neutral-400" />
                              <SortDownIcon className="text-neutral-400 -mt-1" />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-center text-sm text-muted-foreground"
              >
                No results found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b last:border-0">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2 text-sm">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
