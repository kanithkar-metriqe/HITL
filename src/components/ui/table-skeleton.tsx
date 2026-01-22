import type { ReactNode } from "react";

// ========== SKELETON LOADER COMPONENT ==========
interface TableSkeletonProps {
  columns: number;
  rows?: number;
  height?: string;
}

const SkeletonRow: React.FC<{ columns: number }> = ({ columns }): ReactNode => (
  <tr className="bg-white border-b border-gray-200">
    {Array.from({ length: columns }).map((_, idx) => (
      <td key={idx} className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
      </td>
    ))}
  </tr>
);

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns,
  rows = 5,
  height = "h-full",
}): ReactNode => {
  return (
    <div className={`space-y-4 flex flex-col ${height}`}>
      {/* Header Skeleton */}
      <div className="flex justify-between items-center flex-shrink-0">
        <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Table Skeleton */}
      <div className="border border-gray-200 rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="overflow-y-auto flex-1">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                {Array.from({ length: columns }).map((_, idx) => (
                  <th key={idx} className="px-6 py-3">
                    <div className="h-4 bg-gray-300 rounded w-24 animate-pulse" />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {Array.from({ length: rows }).map((_, rowIdx) => (
                <SkeletonRow key={rowIdx} columns={columns} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between pt-4 flex-shrink-0">
        <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-8 w-12 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};