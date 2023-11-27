"use client";

import { ElementRef, ReactElement, RefObject, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { ListWithCards } from "@/types";
import { ListHeader } from "./list-header";

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
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader
          onAddCard={enableEditing}
          data={data}
        />
      </div>
    </li>
  );
}
