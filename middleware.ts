import {
  clerkMiddleware,
  ClerkMiddlewareAuth,
  createRouteMatcher,
} from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

const isPublicRoute: (req: NextRequest) => boolean = createRouteMatcher([
  "/",
  "/api/webhook",
  "/privacy",
]);

export default clerkMiddleware(
  (auth: ClerkMiddlewareAuth, req: NextRequest): Response | undefined => {
    if (auth().userId && isPublicRoute(req)) {
      let path: string = "select-org";

      if (auth().orgId) {
        path = `/organization/${auth().orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth().userId && !isPublicRoute(req)) {
      return auth().redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth().userId && !auth().orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
