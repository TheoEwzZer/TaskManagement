"use client";

import { ReactElement } from "react";

import { useQuery } from "@tanstack/react-query";

import { CardWithListTitle } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { CardModalStore, useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Header } from "./header";

export function CardModal(): ReactElement {
  const id: string | undefined = useCardModal(
    (state: CardModalStore): string | undefined => state.id
  );
  const isOpen: boolean = useCardModal((state: CardModalStore): boolean => state.isOpen);
  const onClose: () => void = useCardModal(
    (state: CardModalStore): (() => void) => state.onClose
  );

  const { data: cardData } = useQuery<CardWithListTitle>({
    queryKey: ["card", id],
    queryFn: (): Promise<CardWithListTitle> => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
      </DialogContent>
    </Dialog>
  );
}
