"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export function OrgControl(): null {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect((): void => {
    if (!setActive) {
      return;
    }

    setActive({
      organization: params.organizationId as string,
    });
  }, [params.organizationId, setActive]);

  return null;
}
