"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { CardModal } from "./CardModal";
export function MusicCards({key,music}) {
  return (
    (<CardContainer key={key} className="inter-var">
      <CardBody
        className=" relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-white">
          {music.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-sm mt-2 text-neutral-300">
            {music.artist}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={`/images/${music.images[0]}`}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" />
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl text-xs font-normal text-white">
            
            <CardModal music={music} />
    
          </CardItem>
          <CardItem
            translateZ={20}
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold">
            <Link href={`/lyrics/${music._id}`}>
            Explore
            </Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>)
  );
}
