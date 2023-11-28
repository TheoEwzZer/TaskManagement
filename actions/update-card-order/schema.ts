import { Card } from "@prisma/client";
import { z } from "zod";

export const UpdateCardOrder: z.ZodObject<
  {
    items: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          title: z.ZodString;
          description: z.ZodNullable<z.ZodString>;
          order: z.ZodNumber;
          listId: z.ZodString;
          createdAt: z.ZodDate;
          updatedAt: z.ZodDate;
        },
        "strip",
        z.ZodTypeAny,
        {
          id: string;
          title: string;
          description: string | null;
          order: number;
          listId: string;
          createdAt: Date;
          updatedAt: Date;
        },
        {
          id: string;
          title: string;
          description: string | null;
          order: number;
          listId: string;
          createdAt: Date;
          updatedAt: Date;
        }
      >,
      "many"
    >;
    boardId: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  { items: Card[]; boardId: string },
  { items: Card[]; boardId: string }
> = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().nullable(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
  boardId: z.string(),
});
