import MusicAddForm from "@/components/MusicAddForm";
import { BackgroundBeams } from "@/components/ui/background-beams";

const AddMusicDetails = () => {
    return (    <div className=" h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="w-full p-12 flex items-center justify-around">
        <h1 className="relative z-10 text-9xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">Contribute</h1>
        <MusicAddForm/>
        </div>
      <BackgroundBeams/>
      </div> );
}
 
export default AddMusicDetails;