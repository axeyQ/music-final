import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "../config/database";
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "https://www.googleapis.com/auth/adsense.readonly" // Add AdSense scope here
                }
            }
        }),
    ],
    callbacks: {
        // Invoked when a user is authenticated
        async signIn({profile, account}){       
            // 1. Connect to the database
            await connectDB();
            // 2. Check if the user exists
            const userExists = await User.findOne({email: profile.email});
            // 3. If not, create a new user
            if(!userExists){
                // Truncate if username to long
                const username = profile.name.slice(0, 20);
                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture,
                    accessToken: account.access_token, // Store access token
                    refreshToken: account.refresh_token // Store refresh token
                })
            } else {
                // Update existing user with new tokens
                userExists.accessToken = account.access_token;
                userExists.refreshToken = account.refresh_token;
                await userExists.save();
            }
            // 4. Return true to allow sign in
            return true;
        },

        // Session callback function that modifies the session object
        async session({session}){
            // 1. Get user from database
            const user = await User.findOne({email: session.user.email});
            // 2. Assign user id from session
            session.user.id = user._id.toString();
            // 3. Store access and refresh tokens in session if needed
            session.user.accessToken = user.accessToken;
            session.user.refreshToken = user.refreshToken;
            // 4. Return session
            return session;
        }
    }
}