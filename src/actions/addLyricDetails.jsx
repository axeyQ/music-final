'use server'

import { redirect } from "next/navigation"
import connectDB from "../../config/database"
import MusicDetails from "@/models/MusicDetails";
import cloudinary from "../../config/cloudinary";
import sharp from "sharp";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";

const AddLyricDetails = async (formData) => {
    try {
        // Validate formData first
        if (!formData) {
            console.error('No form data provided');
            return { error: "No form data provided" };
        }

        try {
            await connectDB();
        } catch (dbError) {
            console.error('Database connection error:', dbError);
            return { error: "Database connection failed" };
        }
        
        let sessionUser;
        try {
            sessionUser = await getSessionUser();
        } catch (sessionError) {
            console.error('Session error:', sessionError);
            return { error: "Session verification failed" };
        }

        if (!sessionUser?.userId) {
            console.error('No user ID found in session');
            return { error: "Authentication required" };
        }

        // Validate required fields
        const title = formData.get('title')?.toString();
        const artist = formData.get('artist')?.toString();
        
        if (!title || !artist) {
            return { error: "Title and artist are required" };
        }

        const musicData = {
            owner: sessionUser.userId,
            title,
            artist,
            album: formData.get('album')?.toString() || '',
            genre: formData.get('genre')?.toString() || '',
            releaseYear: formData.get('releaseYear')?.toString() || '',
            duration: formData.get('duration')?.toString() || '',
            lyrics: formData.get('lyrics')?.toString() || '',
            musicVideo: formData.get('musicVideo')?.toString() || '',
            images: [] // Initialize empty array
        };

        // Handle image upload only if there are images
        const images = formData.getAll('images');
        const filteredImages = images.filter(image => 
            image && image.name !== '' && image instanceof File
        );

        if (filteredImages.length > 0) {
            try {
                const imageUrls = await Promise.all(
                    filteredImages.map(async (imageFile) => {
                        // Validate file size
                        if (imageFile.size > 5 * 1024 * 1024) { // 5MB limit
                            throw new Error('Image file too large');
                        }

                        const imageBuffer = await imageFile.arrayBuffer();
                        const imageArray = Array.from(new Uint8Array(imageBuffer));
                        const imageData = Buffer.from(imageArray);

                        const compressedImageBuffer = await sharp(imageData)
                            .resize({ width: 1024 })
                            .jpeg({ quality: 80 })
                            .toBuffer();

                        const imageBase64 = compressedImageBuffer.toString('base64');
                        
                        return await cloudinary.uploader.upload(
                            `data:image/jpeg;base64,${imageBase64}`,
                            { 
                                folder: "musify",
                                timeout: 120000, // Increased timeout
                            }
                        );
                    })
                );
                musicData.images = imageUrls.map(result => result.secure_url);
            } catch (uploadError) {
                console.error('Image upload error:', uploadError);
                return { error: "Failed to upload images: " + uploadError.message };
            }
        }

        try {
            const newMusicDetails = new MusicDetails(musicData);
            await newMusicDetails.save();
            revalidatePath('/', 'layout');
            return { success: true, id: newMusicDetails._id };
        } catch (saveError) {
            console.error('Database save error:', saveError);
            return { error: "Failed to save music details" };
        }

    } catch (error) {
        console.error('AddLyricDetails Error:', error);
        return { error: "An unexpected error occurred: " + error.message };
    }
}

export default AddLyricDetails;