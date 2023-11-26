import { ReactElement, ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

function PlatformLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
}

export default PlatformLayout;
