import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export async function createAuditLog({
  entityId,
  entityType,
  entityTitle,
  action,
}: Props): Promise<void> {
  try {
    const { orgId } = auth();
    const user: User | null = await currentUser();

    if (!user || !orgId) {
      throw new Error("No user found");
    }

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user.imageUrl,
        userName: (user.firstName ? user.firstName + " " : "") + (user.lastName || ""),
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]: ", error);
  }
}
