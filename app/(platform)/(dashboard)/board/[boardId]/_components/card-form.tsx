"use client";

import {
  forwardRef,
  useRef,
  ElementRef,
  KeyboardEventHandler,
  ReactElement,
  ForwardedRef,
  RefObject,
} from "react";

import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useOnClickOutside, useEventListener } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";
import { Card } from "@prisma/client";
import { toast } from "sonner";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  (
    { listId, enableEditing, disableEditing, isEditing }: CardFormProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): ReactElement => {
    const params = useParams();
    const formRef: RefObject<HTMLFormElement> = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data: Card): void => {
        toast.success(`Card "${data.title}" created!`);
        formRef.current?.reset();
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

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e: React.KeyboardEvent<HTMLTextAreaElement>
    ): void => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit: (formData: FormData) => void = (formData: FormData): void => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      execute({ title, listId, boardId });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input
            hidden
            id="listId"
            name="listId"
            value={listId}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          className="
            h-auto 
            w-full 
            justify-start 
            px-2 
            py-1.5 
            text-sm 
            text-muted-foreground
          "
          size="sm"
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
