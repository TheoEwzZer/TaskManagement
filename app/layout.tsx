import { ReactElement } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

import "./globals.css";
import { siteConfig } from "@/config/site";

const inter: NextFont = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: "%s | " + siteConfig.name,
  },
  description: siteConfig.description,
};

function RootLayout({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
