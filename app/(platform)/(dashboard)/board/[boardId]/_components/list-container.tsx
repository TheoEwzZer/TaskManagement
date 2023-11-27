"use client";

import { ReactElement, useEffect, useState } from "react";

import { toast } from "sonner";

import { ListWithCards } from "@/types";
import { useAction } from "@/hooks/use-action";
import { ListForm } from "./list-form";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export function ListContainer({ data, boardId }: ListContainerProps): ReactElement {
  return (
    <ol>
      <ListForm />
      <div className="flex-shrink-0 w-1"></div>
    </ol>
  );
}
