"use client";

import { ReactElement } from "react";

import { useQuery } from "@tanstack/react-query";

import { CardWithListTitle } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { CardModalStore, useCardModal } from "@/hooks/use-card-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Header } from "./header";
import { Description } from "./description";
import { Actions } from "./actions";
import { AuditLog } from "@prisma/client";
import { Activity } from "./activity";
import { Member } from "./member";
import { DueDate } from "./due-time";

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

  const { data: auditLogsData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id],
    queryFn: (): Promise<AuditLog[]> => fetcher(`/api/cards/${id}/logs`),
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              <div className="flex items-start gap-x-3 w-full ml-8">
                {cardData && cardData.userName && <Member data={cardData} />}
                {cardData && cardData.dueDate && <DueDate data={cardData} />}
              </div>
              {!cardData ? <Description.Skeleton /> : <Description data={cardData} />}
              {!auditLogsData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogsData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
