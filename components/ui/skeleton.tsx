import { cn } from "@/lib/utils";
import { ReactElement } from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): ReactElement {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
