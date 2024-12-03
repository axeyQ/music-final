"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";
import UtilButtons from "./UtilButtons";

export function NetflixTypeMusicCard({music}) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {window.removeEventListener("keydown", onKeyDown);
    document.body.style.overflow = "auto";}
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (<>
    <AnimatePresence>
      {active && typeof active === "object" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 h-full w-full z-10" />
      )}
    </AnimatePresence>
    <AnimatePresence>
      {active && typeof active === "object" ? (
        <div className="fixed inset-0  grid place-items-center z-[100]">
          <motion.button
            key={`button-${music.title}-${id}`}
            layout
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.05,
              },
            }}
            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
            onClick={() => setActive(null)}>
            <CloseIcon />
          </motion.button>
          <motion.div
            layoutId={`card-${music.title}-${id}`}
            ref={ref}
            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-neutral-900 sm:rounded-3xl overflow-hidden">
            <motion.div layoutId={`image-${music.title}-${id}`}>
              <Image
                priority
                width={500}
                height={500}
                src={music.images[0]}
                alt={music.title}
                className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top" />
            </motion.div>

            <div>
              <div className="flex justify-between items-start p-4">
                <div className="">
                  <h3
                    layoutId={`title-${music.title}-${id}`}
                    className="font-medium text-neutral-200 text-xl">
                    {music.title}
                  </h3>
                  <p
                    layoutId={`description-${music.artist}-${id}`}
                    className="text-neutral-400 text-base">
                    {music.artist}
                  </p>
                  <p
                    layoutId={`description-${music.artist}-${id}`}
                    className="text-neutral-400 text-base">
                    Album: {music.album}
                  </p>

                  <p
                    layoutId={`description-${music.artist}-${id}`}
                    className="text-neutral-400 text-base">
                    Genre: {music.genre}
                  </p>
                  <p
                    layoutId={`description-${music.artist}-${id}`}
                    className="text-neutral-400 text-base">
                    Released in: {music.releaseYear}
                  </p>
                  <p
                    layoutId={`description-${music.artist}-${id}`}
                    className="text-neutral-400 text-base">
                    Duration: {music.duration}
                  </p>
               

                  
                </div>

                <Link
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  href={`/lyrics/${music._id}`}
                  className="px-4 py-3 text-sm rounded-full font-bold bg-blue-500 text-white">
                  Explore
                </Link>
              </div>
              <UtilButtons music={music} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
    <ul
      className="mx-auto w-full grid grid-cols-1 md:grid-cols-1 items-start gap-4">
        <motion.div
          layoutId={`card-${music.title}-${id}`}
          key={music.title}
          onClick={() => setActive(music)}
          className="md:p-4 p-2 flex flex-col  rounded-xl cursor-pointer">
          <div className="flex gap-4 flex-col  w-full relative group bg-black bg-opacity-100 ">
            <motion.div layoutId={`image-${music.title}-${id}`}>
              <Image
                width={250}
                height={250}
                src={music.images[0]}
                alt={music.title}
                className="lg:h-60 h-full w-full  rounded-lg object-cover object-top" />
            </motion.div>
            <div className="flex justify-center items-center flex-col absolute inset-0 bg-black bg-opacity-60 opacity-60 group-hover:opacity-0 transition-opacity duration-300"></div>
            <div className="flex justify-center items-center flex-col absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.h3
                layoutId={`title-${music.title}-${id}`}
                className=" font-medium  text-white dark:text-neutral-200 text-center md:text-center text-3xl">
                {music.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${music.artist}-${id}`}
                className="text-neutral-400 dark:text-neutral-400 text-center md:text-center text-md">
                {music.artist}
              </motion.p>
            </div>
          </div>

        </motion.div>
    </ul>
  </>);
}

export const CloseIcon = () => {
  return (
    (<motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>)
  );
};

