import { ReactElement, ReactNode } from "react";

import { startCase } from "lodash";
import { auth } from "@clerk/nextjs/server";

import { OrgControl } from "./_components/org-control";

export async function generateMetadata(): Promise<{ title: string }> {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "Organization"),
  };
}

function OrganizationIdLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}

export default OrganizationIdLayout;
