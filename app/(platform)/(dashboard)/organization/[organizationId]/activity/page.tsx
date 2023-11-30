import { ReactElement, Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "../_components/info";
import { ActivityList } from "./_components/activity-list";

async function ActivityPage(): Promise<ReactElement> {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-4" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
}

export default ActivityPage;
