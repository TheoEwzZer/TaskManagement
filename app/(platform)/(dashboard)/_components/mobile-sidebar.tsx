"use client";

import { ReactElement, useEffect, useState } from "react";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { MobileSidebarStore, useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import { Sidebar } from "./sidebar";

export function MobileSidebar(): ReactElement | null {
  const pathname: string = usePathname();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const onOpen: () => void = useMobileSidebar(
    (state: MobileSidebarStore): (() => void) => state.onOpen
  );
  const onClose: () => void = useMobileSidebar(
    (state: MobileSidebarStore): (() => void) => state.onClose
  );
  const isOpen: boolean = useMobileSidebar(
    (state: MobileSidebarStore): boolean => state.isOpen
  );

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  useEffect((): void => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className="mr-2 block md:hidden"
        variant="ghost"
        size="sm"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent
          side="left"
          className="p-2 pt-10"
        >
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
}
