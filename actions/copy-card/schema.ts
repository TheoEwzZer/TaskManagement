import { z } from "zod";

export const CopyCard: z.ZodObject<
  { id: z.ZodString; boardId: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { id: string; boardId: string },
  { id: string; boardId: string }
> = z.object({
  id: z.string(),
  boardId: z.string(),
});
