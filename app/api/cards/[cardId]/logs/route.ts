import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { AuditLog, ENTITY_TYPE } from "@prisma/client";

import { db } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: { cardId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const auditLogs: AuditLog[] = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
