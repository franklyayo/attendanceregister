/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        unoptimized: true,        // ← This fixes all external image 400 errors
        domains:['lh3.googleusercontent.com']
    }
};

export default nextConfig;
