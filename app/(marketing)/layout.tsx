import { ReactElement, ReactNode } from "react";

import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

function MarketingLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="h-full">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
