import { ReactElement, ReactNode } from "react";

import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import Features from "./_components/features";
import Testimonials from "./_components/testimonials";

function MarketingLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-40 pb-40 bg-gradient-to-br from-pink-600 to-yellow-400">
        {children}
      </main>
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default MarketingLayout;
