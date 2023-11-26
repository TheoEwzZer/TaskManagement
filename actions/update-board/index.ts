"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";
import { Board } from "@prisma/client";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;

  let board: Board;

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
}

export const updateBoard: (data: {
  title: string;
  id: string;
}) => Promise<ActionState<{ title: string; id: string }, Board>> = createSafeAction(
  UpdateBoard,
  handler
);
