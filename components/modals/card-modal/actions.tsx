"use client";

import { ReactElement } from "react";

import { CardWithListTitle } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { CardModalStore, useCardModal } from "@/hooks/use-card-modal";
import { useAction } from "@/hooks/use-action";
import { toast } from "sonner";
import { Card } from "@prisma/client";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { CardMember } from "@/components/modals/card-modal/card-member";
import { CardDueDate } from "@/components/modals/card-modal/card-due-date";

interface ActionProps {
  data: CardWithListTitle;
}

export function Actions({ data }: ActionProps): ReactElement {
  const params = useParams();
  const cardModal: CardModalStore = useCardModal();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(copyCard, {
    onSuccess: (data: Card): void => {
      toast.success(`Card "${data.title}" copied`);
      cardModal.onClose();
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data: Card): void => {
        toast.success(`Card "${data.title}" deleted`);
        cardModal.onClose();
      },
      onError: (error: string): void => {
        toast.error(error);
      },
    }
  );

  const onCopy: () => void = (): void => {
    const boardId = params.boardId as string;

    executeCopyCard({
      id: data.id,
      boardId,
    });
  };

  const onDelete: () => void = (): void => {
    const boardId = params.boardId as string;

    executeDeleteCard({
      id: data.id,
      boardId,
    });
  };

  return (
    <div className="space-y-4 mt-2">
      <div className="space-y-2 mt-2">
        <p className="text-xs font-semibold">Add to card</p>
        <CardMember data={data} />
        <CardDueDate data={data} />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-semibold">Actions</p>
        <Button
          onClick={onCopy}
          disabled={isLoadingCopy}
          variant="accent"
          className="w-full justify-start"
          size="inline"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </Button>
        <Button
          onClick={onDelete}
          disabled={isLoadingDelete}
          variant="accent"
          className="w-full justify-start"
          size="inline"
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}

Actions.Skeleton = function ActionsSkeleton(): ReactElement {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
