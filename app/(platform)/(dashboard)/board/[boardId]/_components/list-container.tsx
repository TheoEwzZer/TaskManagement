"use client";

import { ReactElement, useEffect, useState } from "react";

import { toast } from "sonner";
import { DragDropContext, Droppable, DroppableProvided } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";
import { useAction } from "@/hooks/use-action";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";
import { Card } from "@prisma/client";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result: T[] = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function ListContainer({ data, boardId }: ListContainerProps): ReactElement {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    onSuccess: (): void => {
      toast.success("List reordered");
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
    onSuccess: (): void => {
      toast.success("Card reordered");
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  useEffect((): void => {
    setOrderedData(data);
  }, [data]);

  const onDragEnd: (result: any) => void = (result: any): void => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list") {
      const items: ListWithCards[] = reorder<ListWithCards>(
        orderedData,
        source.index,
        destination.index
      ).map(
        (item: ListWithCards, index: number): ListWithCards => ({ ...item, order: index })
      );

      setOrderedData(items);
      executeUpdateListOrder({ items, boardId });
    }

    if (type === "card") {
      const newOrderedData: ListWithCards[] = [...orderedData];

      const sourceList: ListWithCards | undefined = newOrderedData.find(
        (list: ListWithCards): boolean => list.id === source.droppableId
      );

      const destinationList: ListWithCards | undefined = newOrderedData.find(
        (list: ListWithCards): boolean => list.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards: Card[] = reorder<Card>(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card: Card, index: number): void => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: reorderedCards,
        });
      } else {
        const [removedCard] = sourceList.cards.splice(source.index, 1);

        removedCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, removedCard);

        sourceList.cards.forEach((card: Card, index: number): void => {
          card.order = index;
        });

        destinationList.cards.forEach((card: Card, index: number): void => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
        executeUpdateCardOrder({
          boardId: boardId,
          items: destinationList.cards,
        });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="lists"
        type="list"
        direction="horizontal"
      >
        {(provided: DroppableProvided): ReactElement => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex h-full gap-x-3"
          >
            {orderedData.map((list: ListWithCards, index: number): ReactElement => {
              return (
                <ListItem
                  key={list.id}
                  index={index}
                  data={list}
                />
              );
            })}
            {provided.placeholder}
            <ListForm />
            <div className="w-1 flex-shrink-0"></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
}
