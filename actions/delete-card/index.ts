"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { Card, List } from "@prisma/client";
import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let card: Card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
}

export const deleteCard: (data: {
  id: string;
  boardId: string;
}) => Promise<ActionState<{ id: string; boardId: string }, Card>> = createSafeAction(
  DeleteCard,
  handler
);
