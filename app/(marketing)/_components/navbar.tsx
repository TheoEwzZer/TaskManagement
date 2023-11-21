import { ReactElement } from "react";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

function Navbar(): ReactElement {
  return (
    <div className="fixed top-0 w-full h-16 px-4 bg-white flex items-center justify-between">
      <div className="md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
        <Logo />
        <div className="space-x-4 flex items-center">
          <Button
            size="sm"
            className="text-white"
            asChild
          >
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button
            size="sm"
            className="text-white bg-orange-600 hover:bg-orange-700"
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
