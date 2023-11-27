import { ReactElement } from "react";

import Link from "next/link";
import localFont from "next/font/local";
import { NextFont } from "next/dist/compiled/@next/font";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const headingFont: NextFont = localFont({
  src: "../../public/fonts/font.woff2",
});

const textFont: NextFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

function MarketingPage(): ReactElement {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-12 px-4 md:px-10 lg:px-20 text-gray-800 pb-20">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-6 text-center",
            headingFont.className
          )}
        >
          <div className="mb-4 flex items-center border shadow-sm p-4 bg-black text-white rounded-full uppercase">
            <Medal className="h-6 w-6 mr-2" />
            No 1 Task Management
          </div>
          <br></br>
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide leading-tight text-white">
            TaskManagement, Boost Your Productivity
          </h1>
          <br></br>
          <div className="text-2xl md:text-4xl bg-orange-600 text-white px-4 py-2 rounded-md">
            Achieve More with Ease
          </div>
          <br></br>
        </div>
        <div
          className={cn(
            "text-lg md:text-xl lg:text-2xl mt-8 max-w-md md:max-w-2xl text-center text-white",
            textFont.className
          )}
        >
          Collaborate, manage projects, and reach new productivity peaks. From high rises
          to the home office, empower your team with TaskManagement.
        </div>
        <br></br>
        <br></br>
        <Button
          className="mt-8 bg-orange-600 hover:bg-orange-700 text-white"
          size="lg"
          asChild
        >
          <Link href="/sign-up">Get TaskManagement for Free</Link>
        </Button>
      </div>
    </>
  );
}
export default MarketingPage;
