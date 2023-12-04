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
          userId: z.ZodNullable<z.ZodString>;
          userImage: z.ZodNullable<z.ZodString>;
          userName: z.ZodNullable<z.ZodString>;
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
          userId: string | null;
          userImage: string | null;
          userName: string | null;
        },
        {
          id: string;
          title: string;
          description: string | null;
          order: number;
          listId: string;
          createdAt: Date;
          updatedAt: Date;
          userId: string | null;
          userImage: string | null;
          userName: string | null;
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
      userId: z.string().nullable(),
      userImage: z.string().nullable(),
      userName: z.string().nullable(),
    })
  ),
  boardId: z.string(),
});
