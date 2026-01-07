import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-mt-gray-skeleton animate-pulse rounded-md", className)}
      data-skel="skeleton"
      {...props}
    />
  );
}

export default Skeleton;
