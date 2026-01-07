import SortDownIcon from "@/components/ui/icons/sort-down-icon";
import SortUpIcon from "@/components/ui/icons/sort-up-icon";
import { cn } from "@/lib/utils";
import type { CustomColumnDef } from "@/types/layout.type";
import { flexRender, type Header } from "@tanstack/react-table";

type TableHeaderCellProps<TData extends object> = {
  header: Header<TData, unknown>;
};

export function TableHeaderCell<TData extends object>({
  header,
}: TableHeaderCellProps<TData>) {
  const canSort = header.column.getCanSort();
  const isSorted = header.column.getIsSorted();
  const col = header.column.columnDef as CustomColumnDef<TData>;

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        canSort && "cursor-pointer select-none",
        col.meta?.align === "right" && "justify-end",
      )}
      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
    >
      <span className="inline-block py-1">
        {flexRender(header.column.columnDef.header, header.getContext())}
      </span>

      {isSorted ? (
        isSorted === "asc" ? (
          <SortUpIcon className="text-neutral-600" />
        ) : (
          <SortDownIcon className="text-neutral-600" />
        )
      ) : (
        canSort && (
          <div className="flex flex-col ml-1">
            <SortUpIcon className="text-neutral-600" />
            <SortDownIcon className="text-neutral-600 mt-0.5" />
          </div>
        )
      )}
    </div>
  );
}
