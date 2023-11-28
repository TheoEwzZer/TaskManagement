import { ReactElement } from "react";

import { Card } from "@prisma/client";

interface CardItemProps {
  data: Card;
  index: number;
}

export function CardItem({ data, index }: CardItemProps): ReactElement {
  return (
    <div
      role="button"
      className="truncate border-2 border-transparent hover:border-black shadow-sm py-2 px-3 text-sm bg-white rounded-md"
    >
      {data.title}
    </div>
  );
}
