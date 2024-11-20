import MusicDetails from "@/models/MusicDetails";
import connectDB from "../../../../../config/database";


export async function GET(req, { params }) {
  const { id } = params;

  try {
    await connectDB();
    const song = await MusicDetails.findById(id).lean();

    if (!song) {
      return new Response("Song not found", { status: 404 });
    }

    return new Response(JSON.stringify(song), { status: 200 });
  } catch (error) {
    console.error("Error fetching song:", error);
    return new Response("Failed to fetch song", { status: 500 });
  }
}
