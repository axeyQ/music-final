'use client'
import ReactPlayer from "react-player";

const YoutubePlayer = ({ url }) => {
    return (     <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <ReactPlayer
          url={url}
          controls={true}
        />
      </div> );
}
 
export default YoutubePlayer;