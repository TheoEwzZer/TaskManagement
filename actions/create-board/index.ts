"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";

async function handler(data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML) {
    return {
      error: "Missing fields. Failed to create board.",
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
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

export const createBoard: (data: { title: string; image: string }) => Promise<
  ActionState<
    {
      title: string;
      image: string;
    },
    {
      id: string;
      orgId: string;
      title: string;
      imageId: string;
      imageThumbUrl: string;
      imageFullUrl: string;
      imageUserName: string;
      imageLinkHTML: string;
      createdAt: Date;
      updatedAt: Date;
    }
  >
> = createSafeAction(CreateBoard, handler);
