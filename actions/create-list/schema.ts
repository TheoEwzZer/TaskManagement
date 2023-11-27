import { z } from "zod";

export const CreateList: z.ZodObject<
  { title: z.ZodString; boardId: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { title: string; boardId: string },
  { title: string; boardId: string }
> = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title must be at least 3 characters",
    }),
  boardId: z.string(),
});
