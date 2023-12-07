import { ReactElement, useState } from "react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { CardWithListTitle } from "@/types";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useParams } from "next/navigation";
import { Card } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { toast } from "sonner";

interface CardDueDateProps {
  data: CardWithListTitle;
}

export function CardDueDate({ data }: CardDueDateProps): ReactElement {
  const params = useParams();
  const queryClient = useQueryClient();

  const [date, setDate] = useState<Date | undefined>(
    data.dueDate ? new Date(data.dueDate) : undefined
  );

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

  const updateDate: () => void = async (): Promise<void> => {
    const boardId = params.boardId as string;

    if (date && data.dueDate) {
      if (date.toISOString() === new Date(data.dueDate).toISOString()) {
        return;
      }
    } else {
      if (!date && !data.dueDate) {
        return;
      }
    }

    if (date) {
      execute({
        id: data.id,
        boardId,
        dueDate: date.toISOString(),
      });
    } else {
      execute({
        id: data.id,
        boardId,
        dueDate: null,
      });
    }
  };

  const removeDate: () => void = async (): Promise<void> => {
    const boardId = params.boardId as string;

    if (date == undefined) {
      return;
    }

    setDate(undefined);

    execute({
      id: data.id,
      boardId,
      dueDate: null,
    });
  };

  return (
    <Popover
      onOpenChange={(): void =>
        setDate(data.dueDate ? new Date(data.dueDate) : undefined)
      }
    >
      <PopoverTrigger asChild>
        <Button
          variant="gray"
          className="w-full justify-start"
          size="inline"
        >
          <Clock className="h-4 w-4 mr-2" />
          Dates
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex flex-col items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <Button
          onClick={updateDate}
          disabled={isLoading}
          className="w-[calc(100%-0.75rem)] my-1 justify-center"
        >
          Save
        </Button>
        <Button
          variant="outline"
          onClick={removeDate}
          disabled={isLoading}
          className="w-[calc(100%-0.75rem)] my-1 justify-center"
        >
          Remove
        </Button>
      </PopoverContent>
    </Popover>
  );
}
