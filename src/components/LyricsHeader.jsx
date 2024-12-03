'use client'
import Image from "next/image";
import { Vortex } from "./ui/vortex";

const LyricsHeader = ({ song }) => {
    return (         
        <Vortex >
    <div className="flex flex-col lg:flex-row justify-start w-full items-center gap-0 lg:gap-20">
          <Image
            src={song.images[0]}
            alt={song.title}
            width={1000}
            height={1000}
            className="lg:my-8 mt-4 w-40 h-40 lg:w-80 lg:h-80 object-cover rounded-lg"
          />
          <div className="flex flex-col lg:items-start items-center ">
            <p className="text-lg text-gray-400 mt-2">{song.artist}</p>
           <h1 className="lg:text-8xl text-2xl font-bold lg:mb-5 mb-2 mt-3">{song.title}</h1>
           <ul className="flex justify-start items-center gap-4">
            <li className="flex items-center">{song.album}</li>
              <li className="flex items-center before:content-['•'] before:mr-2">{song.genre}</li>
              <li className="flex items-center before:content-['•'] before:mr-2">{song.releaseYear}</li>
              <li className="flex items-center before:content-['•'] before:mr-2">{song.duration}</li>
           </ul>
          </div>
          </div>
          </Vortex>
           );
}
 
export default LyricsHeader;