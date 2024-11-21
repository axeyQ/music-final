export default function YouTubeEmbed({ url }) {
    return (
      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={url}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        ></iframe>
      </div>
    );
  }
  