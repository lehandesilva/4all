/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET, // Expose AUTH_SECRET to the application
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
