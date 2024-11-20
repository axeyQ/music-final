import Artist from "@/models/Artist";
import connectDB from "../../../../config/database";

export async function POST(req){
    await connectDB();

    try{
        const body = await req.json();

        const newArtist = new Artist(body);
        const savedArtist = await newArtist.save();

        return new Response(
            JSON.stringify(savedArtist),{
                status: 201,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }catch(error){
        console.error("Error Adding Artist Details",error.message);
        return new Response(
            JSON.stringify({
                message: `Failed to add artist details: ${error.message}`
            }),{
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    }
}