import { ReactElement, ReactNode } from "react";

import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { ClerkProvider } from "@/components/providers/clerk-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

function PlatformLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <ClerkProvider>
        <QueryProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </QueryProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}

export default PlatformLayout;
