"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { InputType, ReturnType } from "./types";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";
import { Board } from "@prisma/client";
import { redirect } from "next/navigation";
import { decreaseAvailableCount } from "@/lib/org-limit";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let board: Board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    await decreaseAvailableCount();

    await createAuditLog({
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      entityTitle: board.title,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
}

export const deleteBoard: (data: {
  id: string;
}) => Promise<ActionState<{ id: string }, Board>> = createSafeAction(
  DeleteBoard,
  handler
);
