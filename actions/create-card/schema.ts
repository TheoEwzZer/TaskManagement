import { z } from "zod";

export const CreateCard: z.ZodObject<
  { title: z.ZodString; boardId: z.ZodString; listId: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { title: string; boardId: string; listId: string },
  { title: string; boardId: string; listId: string }
> = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, {
      message: "Title is required",
    }),
  boardId: z.string(),
  listId: z.string(),
});
