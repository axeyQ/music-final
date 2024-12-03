import YoutubePlayer from "./YoutubePlayer";

const YoutubePlayerGroup = ({url, text, id}) => {
    return (         <div className="w-full flex flex-col lg:mt-20 mt-10" id={id}>

        <h1 className="lg:text-4xl text-2xl font-bold text-center mb-10">{text}</h1>
        <div className="flex lg:flex-row flex-col w-full lg:gap-10 gap-0 flex-wrap">
        { 
          url.map((uri) => (
            <YoutubePlayer url={uri} key={uri} />
          ))
        }
        </div>

      </div> );
}
 
export default YoutubePlayerGroup;