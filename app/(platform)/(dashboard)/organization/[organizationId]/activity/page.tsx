import { ReactElement } from "react";

import { Separator } from "@/components/ui/separator";

import { Info } from "../_components/info";
import { ActivityList } from "./_components/activity-list";
import { checkSubscription } from "@/lib/subscription";

async function ActivityPage(): Promise<ReactElement> {
  const isPro: boolean = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <ActivityList />
    </div>
  );
}

export default ActivityPage;
