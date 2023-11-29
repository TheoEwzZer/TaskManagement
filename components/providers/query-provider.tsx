"use client";

import { ReactElement, ReactNode, useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({ children }: { children: ReactNode }): ReactElement {
  const [queryClient] = useState<QueryClient>(new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
