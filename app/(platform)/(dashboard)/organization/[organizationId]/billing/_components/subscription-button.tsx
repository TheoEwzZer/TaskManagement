"use client";

import { ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { ProModalStore, useProModal } from "@/hooks/use-pro-modal";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export function SubscriptionButton({ isPro }: SubscriptionButtonProps): ReactElement {
  const proModal: ProModalStore = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data: string): void => {
      window.location.href = data;
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const onClick: () => void = (): void => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={onClick}
        disabled={isLoading}
        variant="default"
      >
        {isPro ? "Manage subscription" : "Upgrade to Pro"}
      </Button>
    </div>
  );
}
