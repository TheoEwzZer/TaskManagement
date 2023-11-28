"use client";

import { ElementRef, ReactElement, RefObject, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";
import { CardForm } from "./card-form";
import { Card } from "@prisma/client";
import { CardItem } from "./card-item";
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export function ListItem({ data, index }: ListItemProps): ReactElement {
  const textareaRef: RefObject<HTMLTextAreaElement> =
    useRef<ElementRef<"textarea">>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const disableEditing: () => void = (): void => {
    setIsEditing(false);
  };

  const enableEditing: () => void = (): void => {
    setIsEditing(true);
    setTimeout((): void => {
      textareaRef.current?.focus();
    });
  };

  return (
    <Draggable
      draggableId={data.id}
      index={index}
    >
      {(provided: DraggableProvided): ReactElement => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader
              onAddCard={enableEditing}
              data={data}
            />
            <Droppable
              droppableId={data.id}
              type="card"
            >
              {(provided: DroppableProvided): ReactElement => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.cards.map(
                    (card: Card, index: number): ReactElement => (
                      <CardItem
                        index={index}
                        key={card.id}
                        data={card}
                      />
                    )
                  )}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              ref={textareaRef}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
}
