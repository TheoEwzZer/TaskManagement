import { ReactElement } from "react";

import { Card } from "@prisma/client";
import { Draggable, DraggableProvided } from "@hello-pangea/dnd";

interface CardItemProps {
  data: Card;
  index: number;
}

export function CardItem({ data, index }: CardItemProps): ReactElement {
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
          className="truncate border-2 border-transparent hover:border-black shadow-sm py-2 px-3 text-sm bg-white rounded-md"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
}
