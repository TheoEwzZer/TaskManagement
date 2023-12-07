import { ReactElement } from "react";

import { Card } from "@prisma/client";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { CardModalStore, useCardModal } from "@/hooks/use-card-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { add, isPast, isWithinInterval } from "date-fns";
import { Clock } from "lucide-react";

interface CardItemProps {
  data: Card;
  index: number;
}

export function CardItem({ data, index }: CardItemProps): ReactElement {
  const cardModal: CardModalStore = useCardModal();

  return (
    <Draggable
      draggableId={data.id}
      index={index}
    >
      {(provided: DraggableProvided): ReactElement => (
        <div className="border-2 border-transparent hover:border-black shadow-sm py-2 px-3 text-sm bg-white rounded-md flex flex-col">
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={(): void => cardModal.onOpen(data.id)}
            className="py-2 px-3 text-sm"
          >
            <div>{data.title}</div>
          </div>
          <div className="text-sm flex justify-between space-x-3">
            {data && data.dueDate ? (
              <>
                {data.isComplete ? (
                  <Badge variant="success">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(data.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </Badge>
                ) : (
                  <>
                    {isWithinInterval(data.dueDate, {
                      start: new Date(),
                      end: add(new Date(), { hours: 24 }),
                    }) || isPast(data.dueDate) ? (
                      <Badge variant="destructive">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(data.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Badge>
                    ) : (
                      <Badge variant="transparent">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(data.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Badge>
                    )}
                  </>
                )}
              </>
            ) : (
              <div className="ml-2" />
            )}
            {data && data.userImage && data.userName && (
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={data.userImage}
                  alt={data.userName}
                />
              </Avatar>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
