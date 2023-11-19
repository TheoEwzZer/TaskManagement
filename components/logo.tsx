import { ReactElement } from "react";

import Link from "next/link";
import localFont from "next/font/local";
import { NextFont } from "next/dist/compiled/@next/font";

import { cn } from "@/lib/utils";

const headingFont: NextFont = localFont({
  src: "../public/fonts/font.woff2",
});

export function Logo(): ReactElement {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <p className={cn("text-lg text-neutral-700", headingFont.className)}>
          TaskManagement
        </p>
      </div>
    </Link>
  );
}
