import { ReactElement, ReactNode } from "react";

import { ClerkProvider } from "@clerk/nextjs";

function PlatformLayout({ children }: { children: ReactNode }): ReactElement {
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default PlatformLayout;
