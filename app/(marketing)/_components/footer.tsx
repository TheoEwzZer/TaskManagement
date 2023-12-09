import { ReactElement } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Footer(): ReactElement {
  return (
    <div
      className={`
        w-full 
        border-t 
        border-[#e7e5e4]
        bg-slate-100 
        p-4
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
            className={`
          text-white 
          hover:bg-black
        `}
          >
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button
            size="sm"
            className={`
              bg-orange-600 
              text-white 
              hover:bg-orange-700
            `}
          >
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
