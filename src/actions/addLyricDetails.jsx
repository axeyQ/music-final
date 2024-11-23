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
            throw new Error("No form data provided");
        }

        await connectDB();
        
        const sessionUser = await getSessionUser();
        if (!sessionUser?.userId) {
            return { error: "Authentication required" }; // Return error instead of throwing
        }

        const images = formData.getAll('images');
        if (!images || !Array.isArray(images)) {
            console.error('Invalid images data:', images);
            return { error: "Invalid image data" };
        }

        const filteredImages = images.filter(image => 
            image && image.name !== '' && image instanceof File
        );

        // Create music data without images first
        const musicData = {
            owner: sessionUser.userId,
            title: formData.get('title')?.toString() || '',
            artist: formData.get('artist')?.toString() || '',
            album: formData.get('album')?.toString() || '',
            genre: formData.get('genre')?.toString() || '',
            releaseYear: formData.get('releaseYear')?.toString() || '',
            duration: formData.get('duration')?.toString() || '',
            lyrics: formData.get('lyrics')?.toString() || '',
            musicVideo: formData.get('musicVideo')?.toString() || '',
            karaoke: collectNumberedUrls('karaokeUrl'),
            dance: collectNumberedUrls('danceUrl'),
            covers: collectNumberedUrls('coverUrl'),
            instrumentals: collectNumberedUrls('instrumentalUrl'),
            images: [] // Initialize empty array
        };

        // Handle image uploads separately
        if (filteredImages.length > 0) {
            try {
                const imageUrls = await Promise.all(
                    filteredImages.map(async (imageFile) => {
                        const imageBuffer = await imageFile.arrayBuffer();
                        const imageArray = Array.from(new Uint8Array(imageBuffer));
                        const imageData = Buffer.from(imageArray);

                        const compressedImageBuffer = await sharp(imageData)
                            .resize({ width: 1024 })
                            .jpeg({ quality: 80 })
                            .toBuffer();

                        const imageBase64 = compressedImageBuffer.toString('base64');
                        
                        const result = await cloudinary.uploader.upload(
                            `data:image/jpeg;base64,${imageBase64}`,
                            { 
                                folder: "musify",
                                timeout: 60000,
                            }
                        );
                        return result.secure_url;
                    })
                );
                musicData.images = imageUrls;
            } catch (uploadError) {
                console.error('Image upload error:', uploadError);
                return { error: "Failed to upload images" };
            }
        }

        // Save to database
        const newMusicDetails = new MusicDetails(musicData);
        await newMusicDetails.save();

        revalidatePath('/', 'layout');
        return { success: true, id: newMusicDetails._id };

    } catch (error) {
        console.error('AddLyricDetails Error:', error);
        return { error: error.message || "An unexpected error occurred" };
    }
}

export default AddLyricDetails;