"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "./ui/moving-border";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import PlayAnimation from "./PlayAnimation";

export function Hero() {
  return (
    (<AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className=" relative flex flex-col gap-4 items-center justify-center px-4">
        <div className=" text-4xl md:text-8xl font-bold relative md:leading-2 leading-0 z-10 dark:text-white text-center">
          Search Trending Music, Lyrics<br/>and Much More
          <PlayAnimation />
        </div>
        <div
          className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And Yeah, Contribute and Earn
        </div>
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-semibold"
          >
          Explore Now&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faPlay}/>
        </Button>
        
      </motion.div>
    </AuroraBackground>)
  );
}
