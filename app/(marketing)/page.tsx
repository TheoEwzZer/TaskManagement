import { ReactElement } from "react";

import Link from "next/link";
import localFont from "next/font/local";
import { NextFont } from "next/dist/compiled/@next/font";
import { Poppins } from "next/font/google";
import { Medal } from "lucide-react";
import Features from "./_components/features";
import Testimonials from "./_components/testimonials";
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
      <div
        className={`
          flex 
          flex-col 
          items-center 
          justify-center 
          bg-gradient-to-br 
          from-pink-600 
          to-yellow-400 
          px-4 
          py-12 
          pb-40 
          pt-40 
          text-gray-800 
          md:px-10 
          lg:px-20
        `}
      >
        <div
          className={cn(
            `
              flex 
              flex-col 
              items-center 
              justify-center 
              space-y-6 
              text-center
            `,
            headingFont.className
          )}
        >
          <div
            className={`
              mb-4 
              flex 
              items-center 
              rounded-full 
              border 
              bg-black 
              p-4 
              uppercase 
              text-white 
              shadow-sm
            `}
          >
            <Medal className="mr-2 h-6 w-6" />
            No 1 Task Management
          </div>
          <br></br>
          <h1
            className={`
              text-4xl 
              font-bold 
              leading-tight 
              tracking-wide 
              text-white 
              md:text-6xl
            `}
          >
            TaskManagement, Boost Your Productivity
          </h1>
          <br></br>
          <div
            className={`
              rounded-md 
              bg-orange-600 
              px-4 
              py-2 
              text-2xl 
              text-white 
              md:text-4xl
            `}
          >
            Achieve More with Ease
          </div>
          <br></br>
        </div>
        <div
          className={cn(
            `
              mt-8 
              max-w-md 
              text-center 
              text-lg 
              text-white 
              md:max-w-2xl 
              md:text-xl 
              lg:text-2xl
            `,
            textFont.className
          )}
        >
          Collaborate, manage projects, and reach new productivity peaks. From high rises
          to the home office, empower your team with TaskManagement.
        </div>
        <br></br>
        <br></br>
        <Button
          className="mt-8 bg-orange-600 text-white hover:bg-orange-700"
          size="lg"
          asChild
        >
          <Link href="/sign-up">Get TaskManagement for Free</Link>
        </Button>
      </div>
      <Features />
      <Testimonials />
    </>
  );
}
export default MarketingPage;
