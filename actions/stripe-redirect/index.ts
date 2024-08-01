"use server";

import { revalidatePath } from "next/cache";
import { OrgSubscription } from "@prisma/client";

import { db } from "@/lib/db";
import { ActionState, createSafeAction } from "@/lib/create-safe-action";

import { StripeRedirect } from "./schema";
import { InputType, ReturnType } from "./types";
import { User, auth, currentUser } from "@clerk/nextjs/server";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handler(_data: InputType): Promise<ReturnType> {
  const { userId, orgId } = auth();
  const user: User | null = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  const settingsUrl: string = absoluteUrl(`/organization/${orgId}`);

  let url: string = "";

  try {
    const orgSubscription: OrgSubscription | null = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession: Stripe.Response<Stripe.BillingPortal.Session> =
        await stripe.billingPortal.sessions.create({
          customer: orgSubscription.stripeCustomerId,
          return_url: settingsUrl,
        });

      url = stripeSession.url;
    } else {
      const stripeSession: Stripe.Response<Stripe.Checkout.Session> =
        await stripe.checkout.sessions.create({
          success_url: settingsUrl,
          cancel_url: settingsUrl,
          payment_method_types: ["card"],
          mode: "subscription",
          billing_address_collection: "auto",
          customer_email: user.emailAddresses[0].emailAddress,
          line_items: [
            {
              price_data: {
                currency: "EUR",
                product_data: {
                  name: "TaskManagement Pro",
                  description: "Unlimited boards for your organization",
                },
                unit_amount: 999,
                recurring: {
                  interval: "month",
                },
              },
              quantity: 1,
            },
          ],
          metadata: {
            orgId,
          },
        });

      url = stripeSession.url || "";
    }
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: url };
}

export const stripeRedirect: (data: {}) => Promise<ActionState<{}, string>> =
  createSafeAction(StripeRedirect, handler);
