import { ReactElement } from "react";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Board } from "@prisma/client";
import { BoardTileForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps {
  data: Board;
}

export async function BoardNavbar({ data }: BoardNavbarProps): Promise<ReactElement> {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <BoardTileForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
}
