import { ReactElement } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Footer(): ReactElement {
  return (
    <div className="w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button
            size="sm"
            className="text-white bg-black hover:"
          >
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button
            size="sm"
            className="text-white bg-orange-600 hover:bg-orange-700"
          >
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
