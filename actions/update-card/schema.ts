import { z } from "zod";

export const UpdateCard: z.ZodObject<
  {
    boardId: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    boardId: string;
    id: string;
    description?: string | undefined;
    title?: string | undefined;
  },
  {
    boardId: string;
    id: string;
    description?: string | undefined;
    title?: string | undefined;
  }
> = z.object({
  boardId: z.string(),
  description: z.optional(
    z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description is required",
      })
      .min(3, {
        message: "Description must be at least 3 characters",
      })
  ),
  title: z.optional(
    z
      .string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
      })
      .min(3, {
        message: "Title must be at least 3 characters",
      })
  ),
  id: z.string(),
});
