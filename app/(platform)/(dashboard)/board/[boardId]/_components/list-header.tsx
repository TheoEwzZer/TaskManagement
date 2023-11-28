"use client";

import { toast } from "sonner";
import { List } from "@prisma/client";
import { useEventListener } from "usehooks-ts";
import { useState, useRef, ElementRef, ReactElement, RefObject } from "react";

import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

export function ListHeader({ data, onAddCard }: ListHeaderProps): ReactElement {
  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef: RefObject<HTMLFormElement> = useRef<ElementRef<"form">>(null);
  const inputRef: RefObject<HTMLInputElement> = useRef<ElementRef<"input">>(null);

  const enableEditing: () => void = (): void => {
    setIsEditing(true);
    setTimeout((): void => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing: () => void = (): void => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data: List): void => {
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const handleSubmit: (formData: FormData) => void = (formData: FormData): void => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur: () => void = (): void => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown: (e: KeyboardEvent) => void = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2">
      {isEditing ? (
        <form
          ref={formRef}
          action={handleSubmit}
          className="flex-1 px-[2px]"
        >
          <input
            hidden
            id="id"
            name="id"
            value={data.id}
          />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
          />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title.."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button
            type="submit"
            hidden
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions
        onAddCard={onAddCard}
        data={data}
      />
    </div>
  );
}
