import AddLyricDetails from "@/actions/addLyricDetails";
import { Button } from "./ui/moving-border";

const MusicAddForm = () => {
    return (  
        <form action={AddLyricDetails} className="w-full flex flex-col md:flex-row items-start  p-16 gap-4 mt-10">
        <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 ">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className="rounded-lg border p-2 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10  text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            required
            className="rounded-lg border p-2 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
        </div>

          <div className="flex gap-4">

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
          </div>
          <div className="flex gap-4">
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
          /></div>

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
          </div>
          <div className="flex flex-col gap-4 items-end justify-start w-full">

          <input
            type="url"
            name="musicVideo"
            placeholder="Music Video URL"
            required
            className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
          />
          {/* Karaoke Links */}
          <div className="space-y-2 w-full">
            <input
              type="url"
              name="karaokeUrl1"
              placeholder="Karaoke URL 1"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
            />
            <div className="hidden peer-[&:not(:placeholder-shown)]:block">
              <input
                type="url"
                name="karaokeUrl2"
                placeholder="Karaoke URL 2"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
              />
              <div className="hidden peer-[&:not(:placeholder-shown)]:block">
                <input
                  type="url"
                  name="karaokeUrl3"
                  placeholder="Karaoke URL 3"
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
                />
                <div className="hidden peer-[&:not(:placeholder-shown)]:block">
                  <input
                    type="url"
                    name="karaokeUrl4"
                    placeholder="Karaoke URL 4"
                    className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dance Links */}
          <div className="space-y-2 w-full">
            <input
              type="url"
              name="danceUrl1"
              placeholder="Dance URL 1"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
            />
            <div className="hidden peer-[&:not(:placeholder-shown)]:block">
              <input
                type="url"
                name="danceUrl2"
                placeholder="Dance URL 2"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
              />
              <div className="hidden peer-[&:not(:placeholder-shown)]:block">
                <input
                  type="url"
                  name="danceUrl3"
                  placeholder="Dance URL 3"
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
                />
                <div className="hidden peer-[&:not(:placeholder-shown)]:block">
                  <input
                    type="url"
                    name="danceUrl4"
                    placeholder="Dance URL 4"
                    className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cover Links */}
          <div className="space-y-2 w-full">
            <input
              type="url"
              name="coverUrl1"
              placeholder="Cover URL 1"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
            />
            <div className="hidden peer-[&:not(:placeholder-shown)]:block">
              <input
                type="url"
                name="coverUrl2"
                placeholder="Cover URL 2"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
              />
              <div className="hidden peer-[&:not(:placeholder-shown)]:block">
                <input
                  type="url"
                  name="coverUrl3"
                  placeholder="Cover URL 3"
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
                />
                <div className="hidden peer-[&:not(:placeholder-shown)]:block">
                  <input
                    type="url"
                    name="coverUrl4"
                    placeholder="Cover URL 4"
                    className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Instrumental Links */}
          <div className="space-y-2 w-full">
            <input
              type="url"
              name="instrumentalUrl1"
              placeholder="Instrumental URL 1"
              className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
            />
            <div className="hidden peer-[&:not(:placeholder-shown)]:block">
              <input
                type="url"
                name="instrumentalUrl2"
                placeholder="Instrumental URL 2"
                className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
              />
              <div className="hidden peer-[&:not(:placeholder-shown)]:block">
                <input
                  type="url"
                  name="instrumentalUrl3"
                  placeholder="Instrumental URL 3"
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700 peer"
                />
                <div className="hidden peer-[&:not(:placeholder-shown)]:block">
                  <input
                    type="url"
                    name="instrumentalUrl4"
                    placeholder="Instrumental URL 4"
                    className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
                  />
                </div>
              </div>
            </div>
          </div>
          <Button type="submit"  borderRadius="1.75rem"
          className="bg-slate-900 text-white border-slate-800 relative z-10">
            Add Music
          </Button>
          </div>
        </form>
 );
}
 
export default MusicAddForm;