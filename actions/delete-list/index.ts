"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { List } from "@prisma/client";
import { DeleteList } from "./schema";
import { InputType, ReturnType } from "./types";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let list: List | null;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
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
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
}

export const deleteList: (data: {
  id: string;
  boardId: string;
}) => Promise<ActionState<{ id: string; boardId: string }, List>> = createSafeAction(
  DeleteList,
  handler
);
