'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

const UtilButtons = ({music}) => {
    return (               <div className="pt-4 relative px-4">

        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-wrap items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]">
          <Link
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          href={{pathname:`/lyrics/${music._id}`, query: {scrollTo: 'music-video'}}}
          className="px-4 py-1 text-sm rounded-full font-bold bg-blue-500 text-white"
          target="_blank"
          >
          Music Video
        </Link>

        <Link
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          target="_blank"
          href={{pathname:`/lyrics/${music._id}`, query: {scrollTo: 'instrumentals'}}}
          className="px-4 py-1 text-sm rounded-full font-bold bg-blue-500 text-white">
          Instrumentals
        </Link>

        <Link
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          target="_blank"
          href={{pathname:`/lyrics/${music._id}`, query: {scrollTo: 'karaoke'}}}
          className="px-4 py-1 text-sm rounded-full font-bold bg-blue-500 text-white">
          Karaoke
        </Link>

        <Link
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          target="_blank"
          href={{pathname:`/lyrics/${music._id}`, query: {scrollTo: 'covers'}}}
          className="px-4 py-1 text-sm rounded-full font-bold bg-blue-500 text-white">
          Covers
        </Link>

        <Link
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          target="_blank"
          href={{pathname:`/lyrics/${music._id}`, query: {scrollTo: 'dance'}}}
          className="px-4 py-1 text-sm rounded-full font-bold bg-blue-500 text-white">
          Dance
        </Link>
        </motion.div>
      </div> );
}
 
export default UtilButtons;