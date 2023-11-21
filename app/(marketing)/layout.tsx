import { ReactElement, ReactNode } from "react";

import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

function MarketingLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="h-full">
      <Navbar />
      <main className="pt-40 pb-20 bg-gradient-to-br from-pink-600 to-yellow-400">
        {children}
      </main>
      <section className="bg-white pt-20 pb-40">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-200 p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Feature 1</h3>
              <p className="text-sm text-gray-600">
                Description of Feature 1 lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Feature 2</h3>
              <p className="text-sm text-gray-600">
                Description of Feature 2 lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Feature 3</h3>
              <p className="text-sm text-gray-600">
                Description of Feature 3 lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-xl">
              <h3 className="text-lg font-semibold mb-2">Feature 4</h3>
              <p className="text-sm text-gray-600">
                Description of Feature 4 lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default MarketingLayout;
