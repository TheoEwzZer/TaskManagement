"use client";

import { ReactElement, useEffect, useState } from "react";

import { toast } from "sonner";

import { ListWithCards } from "@/types";
import { useAction } from "@/hooks/use-action";

import { ListForm } from "./list-form";
import { ListItem } from "./list-item";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export function ListContainer({ data, boardId }: ListContainerProps): ReactElement {
  const [orderedData, setOrderedData] = useState<ListWithCards[]>(data);

  useEffect((): void => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list: ListWithCards, index: number): ReactElement => {
        return (
          <ListItem
            key={list.id}
            index={index}
            data={list}
          />
        );
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
}
