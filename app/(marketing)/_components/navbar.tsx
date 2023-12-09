import { ReactElement } from "react";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

function Navbar(): ReactElement {
  return (
    <div
      className={`
        fixed 
        top-0 
        flex 
        h-16 
        w-full 
        items-center 
        justify-between 
        bg-white 
        px-4 
        opacity-80
      `}
    >
      <div
        className={`
          mx-auto 
          flex 
          w-full 
          items-center 
          justify-between 
          md:max-w-screen-2xl
        `}
      >
        <Logo />
        <div
          className={`
            flex 
            w-full 
            items-center 
            justify-between 
            space-x-4 
            md:block 
            md:w-auto
          `}
        >
          <Button
            size="sm"
            className="text-white"
            asChild
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            size="sm"
            className={`
          bg-orange-600 
          text-white 
          hover:bg-orange-700
        `}
            asChild
          >
            <Link href="/sign-up">Get TaskManagement for free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
