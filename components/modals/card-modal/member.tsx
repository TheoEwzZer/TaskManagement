"use client";

import { ReactElement } from "react";
import { CardWithListTitle } from "@/types";
import { X } from "lucide-react";
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
    <div className="w-max">
      <p className="mb-2 w-fit font-semibold text-neutral-700 dark:text-neutral-300">
        Member
      </p>
      <Popover>
        <PopoverTrigger asChild>
          <li className="flex w-fit items-center gap-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={data.userImage}
                alt={data.userName}
              />
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                  {data.userName}
                </span>
              </p>
            </div>
          </li>
        </PopoverTrigger>
        <PopoverContent
          className="px-0 pb-3 pt-3"
          side="bottom"
          align="start"
        >
          <div
            className={`
              pb-4
              text-center 
              text-sm 
              font-medium 
              text-neutral-600 
              dark:text-neutral-400
            `}
          >
            {data.userName}
          </div>
          <PopoverClose asChild>
            <Button
              variant="ghost"
              className={`
                absolute 
                right-2 
                top-2 
                h-auto 
                w-auto 
                p-2 
                text-neutral-600 
                dark:text-neutral-400
              `}
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <Button
            variant="ghost"
            onClick={onRemove}
            disabled={isLoading}
            className={`
              h-auto 
              w-full 
              justify-start 
              rounded-none 
              p-2 
              px-5 
              text-sm 
              font-normal
            `}
          >
            Remove from card
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
