// ========== REPORTS TABLE COMPONENT (TanStack Table) ==========

import { type SortingState, createColumnHelper, type ColumnDef, useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel, flexRender } from "@tanstack/react-table";
import { ArrowUpDown, Download } from "lucide-react";
import { type ReactNode, useState, useCallback } from "react";
import type { ReportFile } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getReportsGrid } from "../services";
import { TableSkeleton } from "@/components/ui/table-skeleton";

const ReportsTable: React.FC = (): ReactNode => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<ReportFile>();

   /* ------------------------------ API Function ------------------------------ */
  const { data: reportsGrid, isFetching } =
    useQuery(getReportsGrid());


  const handleDownloadPDF = useCallback((fileUrl: string): void => {
    window.open(fileUrl, "_blank");
  }, []);

  const columns: ColumnDef<ReportFile, any>[] = [
    columnHelper.accessor("fileName", {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:text-blue-600"
        >
          File Name
          <ArrowUpDown size={14} className="opacity-50" />
        </button>
      ),
      cell: (info) => (
        <button
          onClick={() => handleDownloadPDF(info.row.original.downloadUrl)}
          className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2"
        >
          <Download size={16} />
          {info.getValue()}
        </button>
      ),
    }),
     columnHelper.accessor("uploadDate", {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:text-blue-600"
        >
          Upload Date
          <ArrowUpDown size={14} className="opacity-50" />
        </button>
      ),
      cell: (info) => info.getValue(),
    }),
     columnHelper.accessor("uploadTime", {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:text-blue-600"
        >
          Upload Time
          <ArrowUpDown size={14} className="opacity-50" />
        </button>
      ),
      cell: (info) => info.getValue(),
    }),
      columnHelper.accessor("uploadDay", {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:text-blue-600"
        >
          Upload Day
          <ArrowUpDown size={14} className="opacity-50" />
        </button>
      ),
      cell: (info) => info.getValue(),
    }),
   
  ];

  const table = useReactTable({
    data: reportsGrid || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  const pageIndex: number = table.getState().pagination.pageIndex;
  const pageSize: number = table.getState().pagination.pageSize;
  const totalRows: number = table.getFilteredRowModel().rows.length;
  const totalPages: number = Math.ceil(totalRows / pageSize);

  const startRow: number = pageIndex * pageSize + 1;
  const endRow: number = Math.min((pageIndex + 1) * pageSize, totalRows);

   // Show skeleton while loading
  if (isFetching) {
    return <TableSkeleton columns={2} rows={3} />;
  }

  return (
    <div className="space-y-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="overflow-y-auto flex-1">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-200 hover:bg-blue-50 transition-colors`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4 shrink-0">
        <div className="text-sm text-gray-600">
          Showing {startRow} - {endRow} of {totalRows}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            First
          </button>

          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Previous
          </button>

          <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white">
            <span className="text-sm text-gray-600">
              Page {pageIndex + 1} of {totalPages}
            </span>
          </div>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Next
          </button>

          <button
            onClick={() => table.setPageIndex(totalPages - 1)}
            disabled={!table.getCanNextPage()}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsTable;