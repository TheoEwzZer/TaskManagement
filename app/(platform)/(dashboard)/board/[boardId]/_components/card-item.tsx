import { ReactElement } from "react";

import { Card } from "@prisma/client";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";
import { CardModalStore, useCardModal } from "@/hooks/use-card-modal";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          onClick={(): void => cardModal.onOpen(data.id)}
          className="border-2 border-transparent hover:border-black shadow-sm py-2 px-3 text-sm bg-white rounded-md flex justify-between"
        >
          <div>{data.title}</div>
          {data && data.userImage && data.userName && (
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={data.userImage}
                alt={data.userName}
              />
            </Avatar>
          )}
        </div>
      )}
    </Draggable>
  );
}
