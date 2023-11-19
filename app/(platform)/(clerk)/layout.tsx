import { ReactElement, ReactNode } from "react";

function ClerkLayout({ children }: { children: ReactNode }): ReactElement {
  return <div className="h-full flex items-center justify-center">{children}</div>;
}

export default ClerkLayout;
