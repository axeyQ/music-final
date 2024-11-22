import MusicAddForm from "@/components/MusicAddForm";
import { BackgroundBeams } from "@/components/ui/background-beams";

const AddMusicDetails = () => {
    return (    <div className=" h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <MusicAddForm/>
      <BackgroundBeams/>
      </div> );
}
 
export default AddMusicDetails;