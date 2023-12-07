import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { AuthObject } from "@clerk/backend";

import { NextRequest, NextResponse } from "next/server";

type Auth = AuthObject & {
  isPublicRoute: boolean;
  isApiRoute: boolean;
};

type WithClerkUrl<T> = T & {
  experimental_clerkUrl: NextRequest["nextUrl"];
};

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook", "/privacy"],
  afterAuth(auth: Auth, req: WithClerkUrl<NextRequest>): any {
    if (auth.userId && auth.isPublicRoute) {
      let path: string = "select-org";

      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
