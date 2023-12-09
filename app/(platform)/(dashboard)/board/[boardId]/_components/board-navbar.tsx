import { ReactElement } from "react";

import { Board } from "@prisma/client";
import { BoardTileForm } from "./board-title-form";
import { BoardOptions } from "./board-options";

interface BoardNavbarProps {
  data: Board;
}

export async function BoardNavbar({ data }: BoardNavbarProps): Promise<ReactElement> {
  return (
    <div
      className={`
        fixed 
        top-14 
        z-[40] 
        flex 
        h-14 
        w-full 
        items-center 
        gap-x-4 
        bg-black/50 
        px-6 
        text-white
      `}
    >
      <BoardTileForm data={data} />
      <div className="ml-auto">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
}
