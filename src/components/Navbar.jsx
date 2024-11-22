"use client";
import { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signIn, signOut , useSession, getProviders} from "next-auth/react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Image from "next/image";

export function NavbarMain() {

  const [active, setActive] = useState(null);
  const [providers, setProviders] = useState();
  const { data: session } = useSession();
  console.log(session);
  useEffect(()=>{
    const setAuthProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    }
    setAuthProvider();
  },[])

  return (
    (<div className="relative w-full flex items-center justify-center">

      <Navbar session={session} providers={providers} setActive={setActive} active={active} className="top-2" />
    </div>)
  );
}

function Navbar({
  session,
  providers,
  setActive,
  active,
  className
}) {
  const items = [
    {
      id: 1,
      name: "Login Required",
      designation: "Login to Contribute",
      image:
        "/images/newRed.png",
    },]
    let loggedIn = null;
    if(session){  
      loggedIn =[
        {
        id: 1,
        name: session.user.name,
        designation: "The Contributer",
        image:
          session.user.image,
      },
    ]
  }
  return (
    (<div
      className={cn("fixed top-10 inset-x-0 max-w-2xl md:w-full w-96 mx-auto z-50 dark ", className)}>
      <Menu setActive={setActive}>
        <Link className="text-white" href="/"><h1 className=" md:text-2xl font-bold text-xl">Musify</h1></Link>
        <div className="flex justify-center items-center gap-10">
          <Link className="text-white " href="/search"><h1 className="md:text-lg text-sm">Search</h1></Link>
          {session ? (
            <Link className="text-white" href="/add"><h1 className="md:text-lg text-sm">Contribute</h1></Link>
        ) : (
          providers ? (
            Object.values(providers).map((provider) => (
              <button className="text-white" key={provider.id} onClick={() => signIn(provider.id)}>
                <h1 className="md:text-lg text-sm">Contribute</h1>
              </button>
            ))
          ) : (
            <button className="text-white" onClick={() => signIn()}>
              <h1 className="md:text-lg text-sm">Contribute</h1>
            </button>
          )
        )}
        </div>
{
  session ? (

    <MenuItem setActive={setActive} active={active} item={loggedIn.image}>
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/add">Your Profile</HoveredLink>
            <HoveredLink href="#" onClick={() => signOut()}>Log Out</HoveredLink>
          </div>
        </MenuItem>
  ) : (
    <AnimatedTooltip items={items}/>
  )
}
        
        {/* <div className="flex justify-center items-center gap-10">
        
       
        </div> */}
      </Menu>
    </div>)
  );
}
