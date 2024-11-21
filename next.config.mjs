/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {   
                protocol: "https",
                hostname: "res.cludinary.com",
                pathname:"**",
            }
        ]
    }
};

export default nextConfig;
