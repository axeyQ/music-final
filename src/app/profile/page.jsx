import Image from "next/image";
import connectDB from "../../../config/database";
import { getSessionUser } from "../../../utils/getSessionUser";

const ProfilePage = async () => {
    await connectDB();
    const sessionUser = await getSessionUser();
    const { userId } = sessionUser;
    
    if (!userId) {
        throw new Error("User ID is required");
    }

    return (
        <div className="w-full p-6 pt-52">
            <div className="bg-white shadow-lg rounded-lg p-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-6 mb-6 ">
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

                {/* Profile Details */}
                <div className="border-t pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                            <div>
                                <label className="text-gray-600 block">Name</label>
                                <p className="font-medium">{sessionUser.user.name}</p>
                            </div>
                            <div>
                                <label className="text-gray-600 block">Email</label>
                                <p className="font-medium">{sessionUser.user.email}</p>
                            </div>
                            <div>
                                <label className="text-gray-600 block">User ID</label>
                                <p className="font-medium">{userId}</p>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Account Settings</h2>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                                Edit Profile
                            </button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition ml-2">
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ProfilePage;