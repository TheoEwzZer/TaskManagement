import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { OrgSubscription } from "@prisma/client";

const DAY_IN_MS = 86_400_000;

export async function checkSubscription(): Promise<boolean> {
  const { orgId } = auth();

  if (!orgId) {
    return false;
  }

  const orgSubscription: OrgSubscription | null = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid: boolean | "" | null =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
}
