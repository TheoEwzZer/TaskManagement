"use client";

import { ReactElement, useEffect, useState } from "react";
import { CardWithListTitle } from "@/types";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { Card } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { add, format, isPast, isWithinInterval } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Hint } from "@/components/hint";
import { Checkbox } from "@/components/ui/checkbox";

interface DueDateProps {
  data: CardWithListTitle;
}
export function DueDate({ data }: DueDateProps): ReactElement | null {
  const queryClient = useQueryClient();
  const params = useParams();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(data.isComplete || false);
  const [hoverDescription, setHoverDescription] = useState<string>("");
  const [badgeDescription, setBadgeDescription] = useState<string>("");
  const [badgeVariant, setBadgeVariant] = useState<"default" | "destructive">("default");

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
        isComplete: isChecked,
      });
    } else {
      execute({
        id: data.id,
        boardId,
        dueDate: undefined,
        isComplete: undefined,
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

  const onCheck: () => void = (): void => {
    const boardId = params.boardId as string;
    if (date) {
      execute({
        id: data.id,
        boardId,
        dueDate: date.toISOString(),
        isComplete: !isChecked,
      });
    } else {
      execute({
        id: data.id,
        boardId,
        dueDate: undefined,
        isComplete: undefined,
      });
    }
    if (!isChecked) {
      setHoverDescription("This card is complete.");
      setBadgeDescription("Complete");
      setBadgeVariant("default");
    } else {
      if (date && isPast(date)) {
        setHoverDescription("This card is past due.");
        setBadgeDescription("Overdue");
        setBadgeVariant("destructive");
      } else if (
        date &&
        isWithinInterval(date, {
          start: new Date(),
          end: add(new Date(), { hours: 24 }),
        })
      ) {
        setHoverDescription("This card is due in less than 24 hours.");
        setBadgeDescription("Due soon");
        setBadgeVariant("destructive");
      }
    }
    setIsChecked(!isChecked);
  };

  useEffect((): void => {
    setDate(data.dueDate ? new Date(data.dueDate) : undefined);
  }, [data.dueDate]);

  useEffect((): void => {
    if (isChecked) {
      setHoverDescription("This card is complete.");
      setBadgeDescription("Complete");
      setBadgeVariant("default");
    } else {
      if (date && isPast(date)) {
        setHoverDescription("This card is past due.");
        setBadgeDescription("Overdue");
        setBadgeVariant("destructive");
      } else if (
        date &&
        isWithinInterval(date, {
          start: new Date(),
          end: add(new Date(), { hours: 24 }),
        })
      ) {
        setHoverDescription("This card is due in less than 24 hours.");
        setBadgeDescription("Due soon");
        setBadgeVariant("destructive");
      }
    }
  }, [date, isChecked]);

  if (!data || !data.dueDate) {
    return null;
  }

  return (
    <div className="w-max">
      <p className="font-semibold text-neutral-700 mb-2 w-fit">Due date</p>
      <Checkbox
        disabled={isLoading}
        checked={isChecked}
        onCheckedChange={onCheck}
        className="mr-1"
      />

      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            {date && isPast(date) && (
              <>
                {isOpen ? (
                  <Badge
                    variant={badgeVariant}
                    className="ml-2"
                  >
                    {badgeDescription}
                  </Badge>
                ) : (
                  <Hint
                    sideOffset={10}
                    side="bottom"
                    description={hoverDescription}
                  >
                    <Badge
                      variant={badgeVariant}
                      className="ml-2"
                    >
                      {badgeDescription}
                    </Badge>
                  </Hint>
                )}
              </>
            )}
            {date &&
              isWithinInterval(date, {
                start: new Date(),
                end: add(new Date(), { hours: 24 }),
              }) &&
              !isPast(date) && (
                <>
                  {isOpen ? (
                    <Badge
                      variant={badgeVariant}
                      className="ml-2"
                    >
                      {badgeDescription}
                    </Badge>
                  ) : (
                    <Hint
                      sideOffset={10}
                      side="bottom"
                      description={hoverDescription}
                    >
                      <Badge
                        variant={badgeVariant}
                        className="ml-2"
                      >
                        {badgeDescription}
                      </Badge>
                    </Hint>
                  )}
                </>
              )}
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
    </div>
  );
}
