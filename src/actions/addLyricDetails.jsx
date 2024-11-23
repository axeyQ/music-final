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
        if (!process.env.CLOUDINARY_CLOUD_NAME || 
            !process.env.CLOUDINARY_API_KEY || 
            !process.env.CLOUDINARY_API_SECRET) {
            throw new Error("Cloudinary configuration is missing");
        }

        await connectDB();

        const sessionUser = await getSessionUser();
        if(!sessionUser || !sessionUser.userId) {
            throw new Error("User not logged in");
        }

        const userId = sessionUser.userId;

        const images = formData
        .getAll('images').filter((image)=>image.name !=='');

        // Helper function to collect numbered URLs
        const collectNumberedUrls = (prefix, maxCount = 4) => {
            try {
                const urls = [];
                for (let i = 1; i <= maxCount; i++) {
                    const url = formData.get(`${prefix}${i}`);
                    if (url && url.trim() !== '') {
                        urls.push(url.trim());
                    }
                }
                console.log(`✅ Successfully collected ${prefix} URLs:`, urls);
                return urls;
            } catch (error) {
                console.error(`❌ Error collecting ${prefix} URLs:`, error);
                return [];
            }
        };

        const musicData = {
          owner:userId,
            title: formData.get('title'),
            artist: formData.get('artist'),
            album: formData.get('album'),
            genre: formData.get('genre'),
            releaseYear: formData.get('releaseYear'),
            duration: formData.get('duration'),
            lyrics: formData.get('lyrics'),
            musicVideo: formData.get('musicVideo'),
            karaoke: collectNumberedUrls('karaokeUrl'),
            dance: collectNumberedUrls('danceUrl'),
            covers: collectNumberedUrls('coverUrl'),
            instrumentals: collectNumberedUrls('instrumentalUrl'),
        }

        // Add debug logging
        console.log('Music Data URLs:', {
            karaoke: musicData.karaoke,
            dance: musicData.dance,
            covers: musicData.covers,
            instrumentals: musicData.instrumentals
        });

        const imageUrls = [];

        for (const imageFile of images) {
            if (imageFile.size > 10 * 1024 * 1024) { // 10MB limit
                throw new Error("Image file size must be less than 10MB");
            }

            const imageBuffer = await imageFile.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            try {
                const compressedImageBuffer = await sharp(imageData)
                    .resize({ width: 1024, withoutEnlargement: true })
                    .jpeg({ quality: 80 })
                    .toBuffer();

                const imageBase64 = compressedImageBuffer.toString('base64');

                // Add upload options and error handling
                const result = await cloudinary.uploader.upload(
                    `data:image/jpeg;base64,${imageBase64}`,
                    {
                        folder: "musify",
                        timeout: 60000,
                        resource_type: "image",
                        allowed_formats: ["jpg", "jpeg", "png"],
                    }
                );
                imageUrls.push(result.secure_url);
            } catch (error) {
                console.error("Image processing/upload error:", error);
                throw new Error(`Failed to process/upload image: ${error.message}`);
            }
        }

        musicData.images = imageUrls;
        const newMusicDetails = new MusicDetails(musicData);
        await newMusicDetails.save();
        console.log('New Music ID:', newMusicDetails._id);
        revalidatePath('/','layout');
        redirect(`/lyrics/${newMusicDetails._id}`)
    } catch (error) {
        console.error("AddLyricDetails error:", error);
        throw error; // Re-throw to be handled by Next.js error boundary
    }
}
 
export default AddLyricDetails;