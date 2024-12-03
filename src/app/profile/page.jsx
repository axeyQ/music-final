import Image from "next/image";
import connectDB from "../../../config/database";
import { getSessionUser } from "../../../utils/getSessionUser";
import MusicDetails from "@/models/MusicDetails";
import ProfileTable from "@/components/ProfileTable";
import User from "@/models/User";
import { convertToSerializeObject } from "../../../utils/convertToObject";

const ProfilePage = async () => {
    await connectDB();
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
    if (!userId) {
        throw new Error("User ID is required");
    }
    const userLogin = await User.findById(userId).lean();
    
    const musics = await MusicDetails.find({owner: userId}).lean();
    const tableContent = musics ? musics.map(music => ({
        ...convertToSerializeObject(music),
        _id: music._id.toString()
    })) : [];

    return (
        <div className="w-full p-6 pt-36">
            <div className="bg-white shadow-lg rounded-lg p-6 ">
                {/* Profile Header */}
                <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between">
                <div className="flex items-center space-x-6 mb-6 ">
                    
                <div className="flex items-center space-x-6">

                    <div className="w-24 h-24 rounded-full overflow-hidden">
                        <Image 
                            src={sessionUser.user.image || '/images/profile.png'} 
                            alt="Profile" 
                            className="w-full h-full object-cover" 
                            width={200}
                            height={200}
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">{sessionUser.user.name}</h1>
                        <p className="text-gray-600">{sessionUser.user.email}</p>
                                          
                        </div>
                    </div>
                    </div>
                    <div className="flex flex-col lg:items-end items-start">
                    <p className="text-gray-600 text-sm">
                        {`Registered On ${ new Date(userLogin.createdAt).toLocaleString()}`}  
                        </p>
                        <p className="text-gray-600 text-sm">
                        {`Total Contributions: ${tableContent.length}`}
                        </p>
                        <p className="text-gray-600 text-sm">
                        {`Total Earnings: ₹0`}
                        </p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="border-t max-h-[50vh] overflow-y-auto">
               <ProfileTable table={tableContent} />
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;