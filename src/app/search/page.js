// app/pages/index.js
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "@/components/SearchInput";
import { NetflixTypeMusicCard } from "@/components/NetflixTypeMusicCard";

export default function SearchComponent() {
  const [musicData, setMusicData] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);

  useEffect(() => {
    const fetchMusicData = async () => {
      try {
        const res = await axios.get("/api/search"); // Fetch data from our route.js API
        setMusicData(res.data);
        setFilteredMusic(res.data); // Initially, show all music
      } catch (error) {
        console.error("Error fetching music data:", error);
      }
    };

    fetchMusicData();
  }, []);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredMusic(musicData); // Show all music if no query
      return;
    }

    const filtered = musicData.filter((music) => {
      const title = music.title?.toLowerCase() || ""; // Default to empty string if undefined
      const artist = music.artist?.toLowerCase() || ""; // Default to empty string if undefined
      return title.includes(query.toLowerCase()) || artist.includes(query.toLowerCase());
    });

    setFilteredMusic(filtered);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center py-10">Music Search</h1>
      <SearchInput onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 p-8">
        {filteredMusic.length === 0 ? (
          <p className="col-span-full text-center text-lg text-gray-400">
            No results found
          </p>
        ) : (
          filteredMusic.map((music) => (
            <NetflixTypeMusicCard key={music._id} music={music} />
          ))
        )}
      </div>
    </div>
  );
}
