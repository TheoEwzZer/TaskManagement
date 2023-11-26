"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: string): Promise<void> {
  await db.board.delete({
    where: {
      id,
    },
  });

  revalidatePath("/organization/org_2YUpeGxzokpjXQmlm7vLcWuXPls");
}
