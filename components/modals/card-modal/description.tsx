"use client";

import { updateCard } from "@/actions/update-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { CardWithListTitle } from "@/types";
import { Card } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, ReactElement, RefObject, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface DescriptionProps {
  data: CardWithListTitle;
}

export function Description({ data }: DescriptionProps): ReactElement {
  const params = useParams();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formRef: RefObject<HTMLFormElement> = useRef<ElementRef<"form">>(null);
  const textareaRef: RefObject<HTMLTextAreaElement> =
    useRef<ElementRef<"textarea">>(null);

  const enableEditing: () => void = (): void => {
    setIsEditing(true);
    setTimeout((): void => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing: () => void = (): void => {
    setIsEditing(false);
  };

  const onKeyDown: (e: KeyboardEvent) => void = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (data: Card): void => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      toast.success(`Card "${data.title}" updated`);
      disableEditing();
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const onSubmit: (formData: FormData) => void = (formData: FormData): void => {
    const description = formData.get("description") as string;
    const boardId = params.boardId as string;

    if (description === data.description) {
      return disableEditing();
    }

    execute({
      id: data.id,
      description,
      boardId,
    });
  };

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700 dark:text-neutral-300">
          Description
        </p>
        {isEditing ? (
          <form
            action={onSubmit}
            ref={formRef}
            className="space-y-2"
          >
            <FormTextarea
              id="description"
              className="mt-2 w-full"
              placeholder="Add a more detailed description"
              defaultValue={data.description || undefined}
              errors={fieldErrors}
              ref={textareaRef}
            />
            <div className="flex items-center gap-x-2">
              <FormSubmit>Save</FormSubmit>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] rounded-md bg-accent px-3.5 py-3 text-sm font-medium"
          >
            {data.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
}

Description.Skeleton = function DescriptionSkeleton(): ReactElement {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-20 w-full bg-neutral-200" />
      </div>
    </div>
  );
};
