import { List } from "@prisma/client";
import { z } from "zod";

export const UpdateListOrder: z.ZodObject<
  {
    items: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          title: z.ZodString;
          order: z.ZodNumber;
          createdAt: z.ZodDate;
          updatedAt: z.ZodDate;
          boardId: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          id: string;
          title: string;
          order: number;
          createdAt: Date;
          updatedAt: Date;
          boardId: string;
        },
        {
          id: string;
          title: string;
          order: number;
          createdAt: Date;
          updatedAt: Date;
          boardId: string;
        }
      >,
      "many"
    >;
    boardId: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  { items: List[]; boardId: string },
  { items: List[]; boardId: string }
> = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
      boardId: z.string(),
    })
  ),
  boardId: z.string(),
});
