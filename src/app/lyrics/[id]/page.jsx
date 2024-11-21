// app/song/[id]/page.js
import axios from "axios";
import LyricsHeader from "@/components/LyricsHeader";
import YoutubePlayer from "@/components/YoutubePlayer";
import YoutubePlayerGroup from "@/components/YoutubePlayerGroup";
import ScrollHandler from "@/components/ScrollHandler";

const SongDetails = async ({ params }) => {
  const { id } = await params;
  
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/song/${id}`);
    const song = res.data;

    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center pt-24 px-40">
      <ScrollHandler />
        <LyricsHeader song={song} />
        <div className="flex justify-start w-screen ">

        <div className="w-full p-6 rounded-lg shadow-lg px-40 z-10">
          <h2 className="text-2xl font-semibold mb-4">Lyrics</h2>
          <pre className="text-gray-300 whitespace-pre-wrap font-poppins">{song.lyrics}</pre>
        </div>
  <div></div>
        </div>

        <div className="flex flex-col items-center w-screen p-20 gap-20">
          <h1 className="text-6xl font-bold text-center">Can&apos;t Get Enough of this Awesome Song?</h1>
        <div className="width-1/2 ">

          <h1 className="text-4xl font-bold text-center mb-10" id="music-video">Watch the Official Music Video</h1>

          <YoutubePlayer url={song.musicVideo} />
        </div>
        {song?.instrumentals?.length > 0 && (
          <YoutubePlayerGroup url={song.instrumentals} id={'instrumentals'} text={'Watch the Instrumentals'} />
          
        )}  

        {song?.karaoke?.length > 0 && (
          <YoutubePlayerGroup url={song.karaoke} id={'karaoke'} text={'Watch the Karaokes and Sing along!'} />
        )}

        {song?.dance?.length > 0 && (
          <YoutubePlayerGroup url={song.dance} id={'dance'} text={'Watch the Dance tutorials and dance along!'} />
        )}

        {song?.covers?.length > 0 && (
          <YoutubePlayerGroup url={song.covers} id={'covers'} text={'Wanna hear the song in a new flavour, here are the covers'} />
        )}


        


        
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching song details:", error);
    console.log("NEXT_PUBLIC_API_DOMAIN:", process.env.NEXT_PUBLIC_API_DOMAIN);
console.error("Error fetching song details:", error.response?.data || error.message || error);

    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-red-500">Failed to load song details.</p>
      </div>
    );
  }
};

export default SongDetails;
