import { ReactElement, ReactNode } from "react";

interface ListWrapperProps {
  children: ReactNode;
}

export function ListWrapper({ children }: ListWrapperProps): ReactElement {
  return <li className="shrink-0 h-full w-[272px] select-none">{children}</li>;
}
