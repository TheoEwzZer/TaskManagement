"use client";

import { ReactElement } from "react";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/actions/delete-board";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

export function BoardOptions({ id }: BoardOptionsProps): ReactElement {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const onDelete: () => void = (): void => {
    execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="transparent"
          className="h-auto w-auto p-2"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
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
          Board actions
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
          onClick={onDelete}
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
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
}
