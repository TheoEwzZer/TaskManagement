import { z } from "zod";

export const DeleteBoard: z.ZodObject<
  { id: z.ZodString },
  "strip",
  z.ZodTypeAny,
  { id: string },
  { id: string }
> = z.object({
  id: z.string(),
});
