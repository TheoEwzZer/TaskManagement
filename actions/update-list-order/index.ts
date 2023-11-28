"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";
import { List, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;
  let lists: List[];

  try {
    const transaction: Prisma.Prisma__ListClient<List, never, DefaultArgs>[] = items.map(
      (list: List): Prisma.Prisma__ListClient<List, never, DefaultArgs> =>
        db.list.update({
          where: {
            id: list.id,
            board: {
              orgId,
            },
          },
          data: {
            order: list.order,
          },
        })
    );

    lists = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: lists };
}

export const updateListOrder: (data: {
  items: List[];
  boardId: string;
}) => Promise<ActionState<{ items: List[]; boardId: string }, List[]>> = createSafeAction(
  UpdateListOrder,
  handler
);
