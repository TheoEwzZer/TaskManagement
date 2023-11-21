import { ReactElement, ReactNode } from "react";
import { OrgControl } from "./_components/org-control";

function OrganizationIdLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default OrganizationIdLayout;
