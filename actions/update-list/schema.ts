import { z } from "zod";

export const UpdateList: z.ZodObject<
  { title: z.ZodString; id: z.ZodString; boardId: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { title: string; id: string; boardId: string },
  { title: string; id: string; boardId: string }
> = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    }),
  id: z.string(),
  boardId: z.string(),
});
