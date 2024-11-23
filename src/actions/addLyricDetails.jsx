'use server'

import { redirect } from "next/navigation"
import connectDB from "../../config/database"
import MusicDetails from "@/models/MusicDetails";
import cloudinary from "../../config/cloudinary";
import sharp from "sharp";
import { getSessionUser } from "../../utils/getSessionUser";
import { revalidatePath } from "next/cache";

const AddLyricDetails = async (formData) => {
    await connectDB();

    const sessionUser = await getSessionUser();
    if(!sessionUser || !sessionUser.userId) throw new Error("User not logged in");

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

    for (const imageFile of images){
        const imageBuffer = await imageFile.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);


        const compressedImageBuffer = await sharp(imageData)
        .resize({ width: 1024 }) // Resize to 1024px width (or adjust as needed)
        .jpeg({ quality: 80 })   // Reduce quality to 80%
        .toBuffer();
        // Convert to base64
        const imageBase64 = compressedImageBuffer.toString('base64');
        console.log("Base64 Image Data Preview:", imageBase64.substring(0, 100) + "..."); // Log the first 100 characters
        cloudinary.api.resources({ max_results: 1 }, (error, result) => {
            if (error) {
              console.error("Cloudinary Configuration Test Failed:", error);
            } else {
              console.log("Cloudinary Configuration Test Succeeded:", result);
            }
          });
        // Make request to cloudinary
        try {
            const result = await cloudinary.uploader.upload(
              `data:image/jpg;base64,${imageBase64}`,
              { folder: "musify",timeout: 60000, }
            );
            imageUrls.push(result.secure_url);
          } catch (error) {
            console.error("Cloudinary Upload Error Details:", error);
            if (error.response) {
              console.error("Cloudinary Error Response:", error.response); // Captures Cloudinary's error message
            }
            throw new Error("Image upload failed: " + error.message);
          }

    }
    musicData.images = imageUrls;
    const newMusicDetails = new MusicDetails(musicData);
    await newMusicDetails.save();
    console.log('New Music ID:', newMusicDetails._id);
    revalidatePath('/','layout');
    redirect(`/lyrics/${newMusicDetails._id}`)
}
 
export default AddLyricDetails;