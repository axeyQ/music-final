// app/api/music/route.js

import MusicDetails from "@/models/MusicDetails";
import connectDB from "../../../../config/database";


// Handler for the GET request to fetch music data
export async function GET() {
  try {
    await connectDB(); // Establish MongoDB connection
    const musicDetails = await MusicDetails.find({}); // Get all music records from MongoDB

    return new Response(JSON.stringify(musicDetails), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch music details:", error);
    return new Response("Failed to fetch music details", { status: 500 });
  }
}
