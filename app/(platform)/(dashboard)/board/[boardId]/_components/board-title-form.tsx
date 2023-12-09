"use client";

import { ElementRef, ReactElement, RefObject, useRef, useState } from "react";

import { Board } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";
import { toast } from "sonner";

interface BoardTileFormProps {
  data: Board;
}

export function BoardTileForm({ data }: BoardTileFormProps): ReactElement {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data: Board): void => {
      toast.success(`Board "${data.title}" updated`);
      setTitle(data.title);
      disabledEditing();
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const formRef: RefObject<HTMLFormElement> = useRef<ElementRef<"form">>(null);
  const inputRef: RefObject<HTMLInputElement> = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing: () => void = (): void => {
    setIsEditing(true);
    setTimeout((): void => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit: (formData: FormData) => void = (formData: FormData): void => {
    const title = formData.get("title") as string;

    execute({ title, id: data.id });
  };

  const disabledEditing: () => void = (): void => {
    setIsEditing(false);
  };

  const onBlur: () => void = (): void => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className="flex items-center gap-x-2"
        ref={formRef}
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="
            h-7 
            border-none 
            bg-transparent 
            px-[7px] 
            py-1 
            text-lg 
            font-bold 
            focus-visible:outline-none 
            focus-visible:ring-transparent
          "
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="h-auto w-auto p-1 px-2 text-lg font-bold"
    >
      {title}
    </Button>
  );
}
