"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";
import { Card, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;
  let updatedCards: Card[];

  try {
    const transaction: Prisma.Prisma__CardClient<Card, never, DefaultArgs>[] = items.map(
      (card: Card): Prisma.Prisma__CardClient<Card, never, DefaultArgs> =>
        db.card.update({
          where: {
            id: card.id,
            list: {
              board: {
                orgId,
              },
            },
          },
          data: {
            order: card.order,
            listId: card.listId,
          },
        })
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: updatedCards };
}

export const updateCardOrder: (data: {
  items: Card[];
  boardId: string;
}) => Promise<ActionState<{ items: Card[]; boardId: string }, Card[]>> = createSafeAction(
  UpdateCardOrder,
  handler
);
