import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { ReactElement, ReactNode } from "react";

import { db } from "@/lib/db";
import { Board } from "@prisma/client";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}): Promise<{ title: string }> {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board: Board | null = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

async function BoardIdLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { boardId: string };
}): Promise<ReactElement> {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board: Board | null = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
}

export default BoardIdLayout;
