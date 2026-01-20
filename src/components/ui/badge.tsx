import type { FileUpload, StatusBadgeProps } from "@/pages/file-status/types";
import type { ReactNode } from "react";

// ========== STATUS BADGE COMPONENT ==========
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }): ReactNode => {
  const statusStyles: Record<FileUpload["status"], string> = {
    Completed: "bg-green-100 text-green-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Failed: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;