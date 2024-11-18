/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_API_URL: process.env.BACKEND_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "4all-image-storage.s3.eu-west-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
