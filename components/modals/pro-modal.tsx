import { ReactElement } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProModalStore, useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";

export function ProModal(): ReactElement {
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
    execute({});
  };

  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">Upgrade to TaskManagement Today!</h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of TaskManagement
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited boards</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className="w-full"
            variant="primary"
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}