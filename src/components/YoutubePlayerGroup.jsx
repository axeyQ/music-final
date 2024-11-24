import YoutubePlayer from "./YoutubePlayer";

const YoutubePlayerGroup = ({url, text, id}) => {
    return (         <div className="width-full flex flex-col mt-20" id={id}>

        <h1 className="text-4xl font-bold text-center mb-10">{text}</h1>
        <div className="flex flex-row gap-10 flex-wrap">
        { 
          url.map((uri) => (
            <YoutubePlayer url={uri} key={uri} />
          ))
        }
        </div>

      </div> );
}
 
export default YoutubePlayerGroup;