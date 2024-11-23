import { AppleCardsCarousel } from "@/components/AppleCardsCarousel";
import { Hero } from "@/components/Hero";
import connectDB from "../../config/database";
import MusicDetails from "@/models/MusicDetails";
import { NetflixTypeMusicCard } from "@/components/NetflixTypeMusicCard";


const Home =async ()=> {
  await connectDB();
  const musicDetails = await MusicDetails.find({}).lean();
  const serializedSongs = musicDetails.map(song => ({
    id: song._id.toString(), // Convert ObjectId to string
    title: song.title,
    artist: song.artist,
    album: song.album,
    genre: song.genre,
    releaseYear: song.releaseYear,
    duration: song.duration,
    images: song.images,
    lyrics: song.lyrics,
    createdAt: song.createdAt.toISOString(), // Convert Date to string
    updatedAt: song.updatedAt.toISOString(),
    musicVideo: song.musicVideo,
    karaoke: song.karaoke,
    dance: song.dance,
    covers: song.covers,
    instrumentals: song.instrumentals
  }));
  return (
<>
  <Hero/>
  <AppleCardsCarousel music={serializedSongs} />
       <h1 className="text-white text-5xl font-bold text-center m-5">Enjoy the music from the large collection</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 p-8 rounded-sm">
       
        {serializedSongs.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-400">
            No results found
          </p>
        ) : (
          serializedSongs.map((music) => (
            <NetflixTypeMusicCard key={music.id}  music={music} />
          ))
        )}
      </div>
</>
  );
}
export default Home;