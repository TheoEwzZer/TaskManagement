import { ReactElement, ReactNode } from "react";

interface ListWrapperProps {
  children: ReactNode;
}

export function ListWrapper({ children }: ListWrapperProps): ReactElement {
  return <li className="h-full w-[272px] shrink-0 select-none">{children}</li>;
}
