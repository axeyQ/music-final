// app/song/[id]/page.js
import React from "react";
import axios from "axios";
import Image from "next/image";

const SongDetails = async ({ params }) => {
  const { id } = await params;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/song/${id}`);
    const song = res.data;

    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold">{song.title}</h1>
        <p className="text-lg text-gray-400 mt-2">{song.artist}</p>
        <Image
          src={`/images/${song.images[0]}`}
          alt={song.title}
          width={1000}
          height={1000}
          className="my-8 w-80 h-80 object-cover rounded-lg"
        />
        <div className="w-4/5 lg:w-3/5 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Lyrics</h2>
          <pre className="text-gray-300 whitespace-pre-wrap">{song.lyrics}</pre>
        </div>
        <div className="w-4/5 lg:w-3/5 bg-gray-800 p-6 mt-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Details</h2>
          <ul className="text-gray-300">
            <li><strong>Album:</strong> {song.album}</li>
            <li><strong>Genre:</strong> {song.genre}</li>
            <li><strong>Release Year:</strong> {song.releaseYear}</li>
            <li><strong>Duration:</strong> {song.duration}</li>
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching song details:", error);
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-red-500">Failed to load song details.</p>
      </div>
    );
  }
};

export default SongDetails;
