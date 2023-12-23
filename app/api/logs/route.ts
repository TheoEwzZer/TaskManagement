import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { AuditLog } from "@prisma/client";

import { db } from "@/lib/db";

export async function GET(req: Request): Promise<NextResponse<unknown>> {
  try {
    const { userId, orgId } = auth();
    const { searchParams } = new URL(req.url);
    const pageParam: string | null = searchParams.get("page");
    let page: number = pageParam ? parseInt(pageParam, 10) - 1 : 0;
    const itemsPerPage = 10;

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!page || page < 0) {
      page = 0;
    }

    const auditLogs: AuditLog[] = await db.auditLog.findMany({
      where: {
        orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: page * itemsPerPage,
      take: itemsPerPage,
    });

    const totalAuditLogs: number = await db.auditLog.count({
      where: {
        orgId,
      },
    });

    return NextResponse.json({ auditLogs, total: totalAuditLogs });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
