"use client";

import { AuditLog } from "@prisma/client";
import { ActivityIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { ReactElement } from "react";
import { ActivityItem } from "@/components/activity-item";

interface ActivityProps {
  items: AuditLog[];
}

export function Activity({ items }: ActivityProps): ReactElement {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <ActivityIcon className="h-5 w-5 mt-0.5 text-neutral-700 dark:text-neutral-300" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Activity
        </p>
        <ol className="mt-2 space-y-4">
          {items.map(
            (item: AuditLog): ReactElement => (
              <ActivityItem
                key={item.id}
                data={item}
              />
            )
          )}
        </ol>
      </div>
    </div>
  );
}

Activity.Skeleton = function ActivitySkeleton(): ReactElement {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
