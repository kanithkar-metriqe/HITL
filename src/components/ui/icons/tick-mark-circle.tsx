import { cn } from "@/lib/utils";
import type { IconProps } from "@/types/layout.type";
import React from "react";



const TickMarkCircle: React.FC<IconProps> = ({ className = "" }) => (
  <svg
    className={cn("w-3.5 h-3.5", className)}
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_996_33974)">
      <path
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
        fill="currentColor"
      />

      <path
        clipRule="evenodd"
        d="M11.2903 6.9513L11.2664 6.97748L6.89446 11.7555C6.80287 11.855 6.68945 11.9271 6.56507 11.9649C6.43416 12.0077 6.29517 12.0114 6.1625 11.9757C6.02983 11.9401 5.90829 11.8663 5.81047 11.762L3.22326 8.9345C3.15248 8.85715 3.09633 8.76531 3.05802 8.66424C3.01972 8.56316 3 8.45484 3 8.34543C3 8.12449 3.08031 7.9126 3.22326 7.75636C3.36621 7.60013 3.5601 7.51236 3.76226 7.51236C3.96443 7.51236 4.15831 7.60013 4.30126 7.75636L6.34947 10.0014L10.6974 5.243C10.9969 4.91574 11.476 4.92228 11.7754 5.243C12.0749 5.57026 12.0749 6.09388 11.7754 6.42114L11.2903 6.9513Z"
        fill="white"
        fillRule="evenodd"
      />
    </g>
  </svg>
);

export default TickMarkCircle;
