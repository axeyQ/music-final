import { AppleCardsCarousel } from "@/components/AppleCardsCarousel";
import { Hero } from "@/components/Hero";
import connectDB from "../../config/database";
import MusicDetails from "@/models/MusicDetails";
import { NetflixTypeMusicCard } from "@/components/NetflixTypeMusicCard";


const Home =async ()=> {
  await connectDB();
  const musicDetails = await MusicDetails.find({}).lean();

  return (
<>
  <Hero/>
  <AppleCardsCarousel music={musicDetails} />
       <h1 className="text-white text-5xl font-bold text-center m-5">Enjoy the music from the large collection</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 p-8 rounded-sm">
       
        {musicDetails.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-400">
            No results found
          </p>
        ) : (
          musicDetails.map((music) => (
            <NetflixTypeMusicCard key={music.id}  music={music} />
          ))
        )}
      </div>
</>
  );
}
export default Home;