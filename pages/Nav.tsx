import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="absolute top-5 right-5 p-4 rounded-full bg-transparent text-black hover:bg-black hover:text-white hover:scale-110 cursor-pointer transition-all duration-300"
    >
      <Bars3Icon height={40} width={40} />
    </div>
  );
}

export default Nav;
