"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { CreateCard } from "./schema";
import { Board, Card, List } from "@prisma/client";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId, listId } = data;

  let card: Card;

  try {
    const list: List | null = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });

    if (!list) {
      return {
        error: "List not found.",
      };
    }

    const lastCard: { order: number } | null = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder: number = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
}

export const createCard: (data: {
  title: string;
  boardId: string;
  listId: string;
}) => Promise<ActionState<{ title: string; boardId: string; listId: string }, Card>> =
  createSafeAction(CreateCard, handler);
