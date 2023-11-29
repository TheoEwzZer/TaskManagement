import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { CardWithListTitle } from "@/types";

export async function GET(
  _req: Request,
  { params }: { params: { cardId: string } }
): Promise<NextResponse<unknown>> {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const card: CardWithListTitle | null = await db.card.findUnique({
      where: {
        id: params.cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
