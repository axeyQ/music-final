'use server'

import { redirect } from "next/navigation"
import connectDB from "../../config/database"
import MusicDetails from "@/models/MusicDetails";
import cloudinary from "../../config/cloudinary";
import sharp from "sharp";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";

export async function AddLyricDetails(formData) {
    try {
        // Connect to database
        await connectDB();

        // Verify session
        const session = await getSessionUser();
        if (!session?.userId) {
            throw new Error('Unauthorized');
        }

        // Extract form data
        const musicData = {
            owner: session.userId,
            title: formData.get('title'),
            artist: formData.get('artist'),
            album: formData.get('album'),
            genre: formData.get('genre'),
            releaseYear: formData.get('releaseYear'),
            duration: formData.get('duration'),
            lyrics: formData.get('lyrics'),
            musicVideo: formData.get('musicVideo'),
            images: []
        };

        // Handle image uploads if any
        const imageFiles = formData.getAll('images');
        if (imageFiles.length > 0) {
            const uploadPromises = imageFiles
                .filter(file => file.size > 0)
                .map(async (file) => {
                    const bytes = await file.arrayBuffer();
                    const buffer = Buffer.from(bytes);
                    
                    const result = await cloudinary.uploader.upload(
                        `data:${file.type};base64,${buffer.toString('base64')}`,
                        {
                            folder: 'musify',
                        }
                    );
                    return result.secure_url;
                });

            musicData.images = await Promise.all(uploadPromises);
        }

        // Save to database
        const newMusic = await MusicDetails.create(musicData);
        
        // Revalidate the path
        revalidatePath('/');
        
        return { success: true, id: newMusic._id };
        
    } catch (error) {
        console.error('Server Action Error:', error);
        throw new Error('Failed to add music details');
    }
}