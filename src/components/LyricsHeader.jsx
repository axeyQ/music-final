'use client'
import Image from "next/image";
import { Vortex } from "./ui/vortex";

const LyricsHeader = ({ song }) => {
    return (         
        <Vortex >
    <div className="flex justify-start w-full items-center gap-20">
          <Image
            src={`/images/${song.images[0]}`}
            alt={song.title}
            width={1000}
            height={1000}
            className="my-8 w-80 h-80 object-cover rounded-lg"
          />
          <div className="flex flex-col items-start ">
            <p className="text-lg text-gray-400 mt-2">{song.artist}</p>
           <h1 className="text-8xl font-bold mb-5 mt-3">{song.title}</h1>
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