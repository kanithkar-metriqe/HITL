import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";

import SortUpIcon from "@/components/ui/icons/sort-up-icon";
import SortDownIcon from "@/components/ui/icons/sort-down-icon";
import { cn } from "@/lib/utils";

type DataTableProps<T extends object> = {
  data: T[];
  columns: any;
};

export function DataTable<T extends object>({
  data,
  columns,
}: DataTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false, 
  });

  return (
    <div className="overflow-x-auto pt-5">
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-mt-gray-250">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const isSorted = header.column.getIsSorted();

                return (
                  <th
                    key={header.id}
                    className={cn(
                      "border px-3 py-2 text-left font-medium",
                      canSort && "cursor-pointer select-none"
                    )}
                    onClick={
                      canSort
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* Sorting Icons */}
                      {canSort && (
                        <>
                          {isSorted === "asc" && (
                            <SortUpIcon className="text-neutral-600" />
                          )}

                          {isSorted === "desc" && (
                            <SortDownIcon className="text-neutral-600" />
                          )}

                          {!isSorted && (
                            <div className="flex flex-col ml-1 gap-1.5">
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

        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-3 py-2">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
