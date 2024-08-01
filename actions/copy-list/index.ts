"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { createAuditLog } from "@/lib/create-audit-log";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { ListWithCards } from "@/types";
import { Card, List } from "@prisma/client";
import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let list: List;

  try {
    const listToCopy: ListWithCards | null = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return {
        error: "List not found.",
      };
    }

    const lastList: { order: number } | null = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder: number = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map(
              (
                card: Card
              ): { title: string; order: number; description: string | null } => ({
                title: card.title,
                order: card.order,
                description: card.description,
              })
            ),
          },
        },
      },
      include: {
        cards: true,
      },
    });
    await createAuditLog({
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      entityTitle: list.title,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
}

export const copyList: (data: {
  id: string;
  boardId: string;
}) => Promise<ActionState<{ id: string; boardId: string }, List>> = createSafeAction(
  CopyList,
  handler
);
