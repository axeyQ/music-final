/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
      appDir: true, // If you are using the `/app` directory
    },
    api: {
      bodyParser: false, // Disable body parser for file uploads
    },
  };
  
  export default nextConfig;
  