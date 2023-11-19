import { ReactElement, ReactNode } from "react";

import Navbar from "./_components/navbar";

function DashboardLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="h-full">
      <Navbar />
      {children}
    </div>
  );
}

export default DashboardLayout;
