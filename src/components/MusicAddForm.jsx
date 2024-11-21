import AddLyricDetails from "@/actions/addLyricDetails";
import { BackgroundBeams } from "./ui/background-beams";
import { Button } from "./ui/moving-border";

const MusicAddForm = () => {
    return (  
        <form action={AddLyricDetails} className="w-full max-w-md flex flex-col gap-4 mt-10">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="rounded-lg border p-2 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-10 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            required
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
          <input
            type="text"
            name="album"
            placeholder="Album"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400 bg-neutral-950 placeholder:text-neutral-700"
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 3:45)"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
          <textarea
            name="lyrics"
            placeholder="Enter lyrics (use newlines for formatting)"
            required
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          ></textarea>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            placeholder="Image URL"
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
          <Button type="submit"  borderRadius="1.75rem"
          className="bg-slate-900 text-white border-slate-800 relative z-10">
            Add Music
          </Button>
  
        </form>
 );
}
 
export default MusicAddForm;