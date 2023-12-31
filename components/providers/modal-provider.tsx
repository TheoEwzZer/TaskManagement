"use client";

import { ReactElement, useEffect, useState } from "react";
import { CardModal } from "../modals/card-modal";
import { ProModal } from "../modals/pro-modal";

export function ModalProvider(): ReactElement | null {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
}
