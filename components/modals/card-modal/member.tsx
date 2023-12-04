"use client";

import { ReactElement } from "react";
import { CardWithListTitle } from "@/types";
import { User2, X } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { Card } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "next/navigation";

interface MemberProps {
  data: CardWithListTitle;
}
export function Member({ data }: MemberProps): ReactElement | null {
  const queryClient = useQueryClient();
  const params = useParams();

  const { execute, isLoading } = useAction(updateCard, {
    onSuccess: (data: Card): void => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Card "${data.title}" updated`);
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  if (!data || !data.userId || !data.userName || !data.userImage) {
    return null;
  }

  const onRemove: () => void = async (): Promise<void> => {
    const boardId = params.boardId as string;

    if (data.userId) {
      execute({
        id: data.id,
        boardId,
        userId: null,
        userImage: null,
        userName: null,
      });
    }
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <User2 className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Member</p>
        <Popover>
          <PopoverTrigger asChild>
            <li className="flex items-center gap-x-2 w-fit">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={data.userImage}
                  alt={data.userName}
                />
              </Avatar>
              <div className="flex flex-col space-y-0.5">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-neutral-700">{data.userName}</span>
                </p>
              </div>
            </li>
          </PopoverTrigger>
          <PopoverContent
            className="px-0 pt-3 pb-3"
            side="bottom"
            align="start"
          >
            <div className="text-sm font-medium text-center text-neutral-600 pb-4">
              {data.userName}
            </div>
            <PopoverClose asChild>
              <Button
                variant="ghost"
                className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </PopoverClose>
            <Button
              variant="ghost"
              onClick={onRemove}
              disabled={isLoading}
              className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
            >
              Remove from card
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
