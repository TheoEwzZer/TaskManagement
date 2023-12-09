import { ReactElement } from "react";

import { NextFont } from "next/dist/compiled/@next/font";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const headingFont: NextFont = localFont({
  src: "../public/fonts/font.woff2",
});

export function Logo(): ReactElement {
  return (
    <Link href="/">
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image
          src="/logo.png"
          alt="Logo"
          height={40}
          width={40}
        />
        <p
          className={cn(
            "text-lg text-neutral-700 dark:text-neutral-300",
            headingFont.className
          )}
        >
          TaskManagement
        </p>
      </div>
    </Link>
  );
}
