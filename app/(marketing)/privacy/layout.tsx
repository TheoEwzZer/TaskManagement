import { ReactElement, ReactNode } from "react";

function PrivacyLayout({ children }: { children: ReactNode }): ReactElement {
  return <div className="h-full">{children}</div>;
}

export default PrivacyLayout;
