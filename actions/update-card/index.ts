"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";

import { InputType, ReturnType } from "./types";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";
import { Card } from "@prisma/client";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId, ...values } = data;

  let card: Card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
    await createAuditLog({
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
      action: ACTION.UPDATE,
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
}

export const updateCard: (data: {
  boardId: string;
  description?: string | undefined;
  id: string;
  title?: string | undefined;
  userId?: string | null | undefined;
  userImage?: string | null | undefined;
  userName?: string | null | undefined;
  dueDate?: string | null | undefined;
  isComplete?: boolean | null | undefined;
}) => Promise<
  ActionState<
    {
      boardId: string;
      description?: string | undefined;
      id: string;
      title?: string | undefined;
      userId?: string | null | undefined;
      userImage?: string | null | undefined;
      userName?: string | null | undefined;
      dueDate?: string | null | undefined;
      isComplete?: boolean | null | undefined;
    },
    Card
  >
> = createSafeAction(UpdateCard, handler);
