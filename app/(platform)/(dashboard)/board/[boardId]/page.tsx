import { ReactElement } from "react";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { ListContainer } from "./_components/list-container";
import { ListWithCards } from "@/types";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

async function BoardIdPage({ params }: BoardIdPageProps): Promise<ReactElement> {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const lists: ListWithCards[] = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer
        boardId={params.boardId}
        data={lists}
      />
    </div>
  );
}

export default BoardIdPage;
