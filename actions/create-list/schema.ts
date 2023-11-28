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
    .min(1, {
      message: "Title is required",
    }),
  boardId: z.string(),
});
