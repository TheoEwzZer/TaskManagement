import { z } from "zod";

export const UpdateCard: z.ZodObject<
  {
    boardId: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dueDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isComplete: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
  },
  "strip",
  z.ZodTypeAny,
  {
    boardId: string;
    description?: string | undefined;
    id: string;
    title?: string | undefined;
    userId?: string | null | undefined;
    userImage?: string | null | undefined;
    userName?: string | null | undefined;
    dueDate?: string | null | undefined;
    isComplete?: boolean | null | undefined;
  },
  {
    boardId: string;
    description?: string | undefined;
    id: string;
    title?: string | undefined;
    userId?: string | null | undefined;
    userImage?: string | null | undefined;
    userName?: string | null | undefined;
    dueDate?: string | null | undefined;
    isComplete?: boolean | null | undefined;
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
  userId: z.string().nullable().optional(),
  userImage: z.string().nullable().optional(),
  userName: z.string().nullable().optional(),
  dueDate: z.string().nullable().optional(),
  isComplete: z.boolean().nullable().optional(),
});
