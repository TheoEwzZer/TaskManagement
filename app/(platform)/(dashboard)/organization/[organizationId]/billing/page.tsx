import { checkSubscription } from "@/lib/subscription";
import { ReactElement } from "react";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { SubscriptionButton } from "./_components/subscription-button";

async function BillingPage(): Promise<ReactElement> {
  const isPro: boolean = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="my-4" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
}

export default BillingPage;
