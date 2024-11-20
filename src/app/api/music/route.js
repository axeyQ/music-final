import MusicDetails from "@/models/MusicDetails";
import connectDB from "../../../../config/database";


export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    // console.log("Request Body:", body); // Log the incoming request body
    
    const newMusic = new MusicDetails(body);
    const savedMusic = await newMusic.save();

    // console.log("Music Saved:", savedMusic); // Log saved data

    return new Response(
      JSON.stringify({ message: "Music Added Successfully", music: savedMusic }),
      { status: 201, headers: { "Content-Type": "application/json" } }
      
    );
  } catch (error) {
    console.error("Error adding music:", error.message);
    return new Response(
      JSON.stringify({ error: `Failed to add music details: ${error.message}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
