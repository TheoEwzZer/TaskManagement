"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { InputType, ReturnType } from "./types";

import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { CreateList } from "./schema";
import { Board, List } from "@prisma/client";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, boardId } = data;

  let list: List;

  try {
    const board: Board | null = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });

    if (!board) {
      return {
        error: "Board not found.",
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
        title,
        boardId,
        order: newOrder,
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

export const createList: (data: {
  title: string;
  boardId: string;
}) => Promise<ActionState<{ title: string; boardId: string }, List>> = createSafeAction(
  CreateList,
  handler
);
