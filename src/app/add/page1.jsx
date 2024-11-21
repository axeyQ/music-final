"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/moving-border";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddMusicPage() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    releaseYear: "",
    duration: "",
    lyrics: "", // Lyrics as a single string
    images: [""],
  });

  const [message, setMessage] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("/api/music", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Check if the response is JSON
      if (res.ok) {
        const data = await res.json(); // Parse JSON response
        console.log("API Response:", data);
        setMessage(toast.success("Music added successfully!"));
      } else {
        // Handle API errors
        const errorData = await res.json();
        console.error("API Error Response:", errorData);
        setMessage(errorData.error || "Failed to add music.");
      }
    } catch (error) {
      console.error("Unexpected Error:", error.message);
      setMessage("An unexpected error occurred.");
    }
  };
  
  
  return (
    <div className=" h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="w-full p-12 flex items-center justify-around">
      <h1 className="relative z-10 text-9xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">Contribute</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4 mt-10">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="rounded-lg border p-2 border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-10 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={formData.artist}
          onChange={handleChange}
          required
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
        />
        <input
          type="text"
          name="album"
          placeholder="Album"
          value={formData.album}
          onChange={handleChange}
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400 bg-neutral-950 placeholder:text-neutral-700"
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={formData.releaseYear}
          onChange={handleChange}
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
        />
        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g., 3:45)"
          value={formData.duration}
          onChange={handleChange}
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
        />
        <textarea
          name="lyrics"
          placeholder="Enter lyrics (use newlines for formatting)"
          value={formData.lyrics}
          onChange={handleChange}
          required
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
        ></textarea>
        <input
          type="text"
          name="images"
          placeholder="Image URL"
          value={formData.images[0]}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              images: [e.target.value],
            }))
          }
          className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500  w-full relative z-10 mt-2 p-2 text-neutral-400  bg-neutral-950 placeholder:text-neutral-700"
        />
        <Button type="submit"  borderRadius="1.75rem"
        className="bg-slate-900 text-white border-slate-800 relative z-10">
          Add Music
        </Button>

      </form>
      {message && <p className="mt-5 text-red-500">{message}</p>}
    </div>
    <BackgroundBeams/>
    </div>
  );
}
