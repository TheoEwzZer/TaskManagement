import { ElementRef, ReactElement, RefObject, useRef } from "react";

import { List } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { copyList } from "@/actions/copy-list";
import { toast } from "sonner";
import { deleteList } from "@/actions/delete-list";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export function ListOptions({ data, onAddCard }: ListOptionsProps): ReactElement {
  const closeRef: RefObject<HTMLButtonElement> = useRef<ElementRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (): void => {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (): void => {
      toast.success(`List "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error: string): void => {
      toast.error(error);
    },
  });

  const onDelete: (formData: FormData) => void = (formData: FormData): void => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeDelete({ id, boardId });
  };

  const onCopy: (formData: FormData) => void = (formData: FormData): void => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3"
        side="bottom"
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Lists actions
        </div>
        <PopoverClose
          ref={closeRef}
          asChild
        >
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          variant="ghost"
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Add card...
        </Button>
        <form action={onCopy}>
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
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy list..
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
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
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
