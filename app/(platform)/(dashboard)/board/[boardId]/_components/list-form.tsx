"use client";

import { useState, useRef, ElementRef, ReactElement, RefObject } from "react";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";

import { ListWrapper } from "./list-wrapper";
import { createList } from "@/actions/create-list";
import { List } from "@prisma/client";

export function ListForm(): ReactElement {
  const router: AppRouterInstance = useRouter();
  const params = useParams();

  const formRef: RefObject<HTMLFormElement> = useRef<ElementRef<"form">>(null);
  const inputRef: RefObject<HTMLInputElement> = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing: () => void = (): void => {
    setIsEditing(true);
    setTimeout((): void => {
      inputRef.current?.focus();
    });
  };

  const disableEditing: () => void = (): void => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data: List): void => {
      toast.success(`List "${data.title}" created!`);
      disableEditing();
      router.refresh();
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const onKeyDown: (e: KeyboardEvent) => void = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit: (formData: FormData) => void = (formData: FormData): void => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, boardId });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            placeholder="Enter list title..."
          />
          <input
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
}
