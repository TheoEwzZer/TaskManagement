"use client";

import { ReactElement } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps): ReactElement {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
