'use server';

import MusicDetails from "@/models/MusicDetails";
import { getSessionUser } from "../../utils/getSessionUser";

async function deleteLyricDetails(songId){
    const sessionUser = await getSessionUser();
    if (!sessionUser || !sessionUser.userId) {
        throw new Error('Unauthorized');
    }

    const {userId} = sessionUser;

    const song = await MusicDetails.findById(songId);
    if (!song) {
        throw new Error('Song not found');
    }

    // verify ownership
    if (song.userId.toString() !== userId) {
        throw new Error('Unauthorized');
    }

        // Extraxt public id from image URLs
        const publicIds = song.images.map((imageUrls)=>{
            const parts = imageUrls.split('/');
            return parts.at(-1).split('.').at(0);
        })
    
        // Delete images from cloudinary
        if (publicIds.length > 0) {
        for (let publicId of publicIds) {
            await cloudinary.uploader.destroy('musify/'+publicId);
        }
    }


    await song.deleteOne();

    revalidatePath('/',layout);



}

export default deleteLyricDetails;
