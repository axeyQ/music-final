'use client'
import ReactPlayer from "react-player";

const YoutubePlayer = ({ url, key }) => {
    return (     <div key={key} style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <ReactPlayer
          url={url}
          controls={true}
        />
      </div> );
}
 
export default YoutubePlayer;