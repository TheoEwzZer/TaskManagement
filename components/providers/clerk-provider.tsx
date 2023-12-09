"use client";

import { ReactElement, ReactNode } from "react";

import { ClerkProvider as CustomClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

interface ClerkProviderProps {
  children: ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps): ReactElement {
  const { resolvedTheme } = useTheme();
  return (
    <CustomClerkProvider
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
        layout: {
          privacyPageUrl: "https://task-management-theo.vercel.app/privacy",
        },
      }}
    >
      {children}
    </CustomClerkProvider>
  );
}
