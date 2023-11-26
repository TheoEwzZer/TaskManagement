"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title } = data;

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
}

export const createBoard: (data: {
  title: string;
}) => Promise<ActionState<{ title: string }, { id: string; title: string }>> =
  createSafeAction(CreateBoard, handler);
