import { cn } from "@/lib/utils";
import type { IconProps } from "@/types/layout.type";


export default function SortUpIcon({ className = "" }: IconProps) {
  return (
    <svg
      className={cn("w-1.5 h-1.5", className)}
      fill="none"
      viewBox="0 0 5 5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.63397 1C2.01888 0.333333 2.98113 0.333333 3.36603 1L4.66506 3.25C5.04996 3.91667 4.56884 4.75 3.79904 4.75H1.20096C0.431161 4.75 -0.0499637 3.91667 0.334936 3.25L1.63397 1Z"
        fill="currentColor"
      />
    </svg>
  );
}
