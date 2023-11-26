import { z } from "zod";

export const UpdateBoard: z.ZodObject<
  { title: z.ZodString; id: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { title: string; id: string },
  { title: string; id: string }
> = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title must be at least 3 characters",
    }),
  id: z.string(),
});
