"use client";
import { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavbarMain() {
  return (
    (<div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>)
  );
}

function Navbar({
  className
}) {
  const [active, setActive] = useState(null);
  return (
    (<div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 dark", className)}>
      <Menu setActive={setActive}>
        <Link className="text-white" href="/"><h1 className=" text-xl font-bold">Music Munch</h1></Link>
        <div className="flex justify-center items-center gap-10">
        <MenuItem setActive={setActive} active={active} item="Explore">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/add">Contribute</HoveredLink>
            <HoveredLink href="/">Login</HoveredLink>
            <HoveredLink href="/">Sign Up</HoveredLink>
          </div>
        </MenuItem>
        <Link className="text-white" href="/search"><h1 className="">Search</h1></Link>
        </div>
      </Menu>
    </div>)
  );
}
