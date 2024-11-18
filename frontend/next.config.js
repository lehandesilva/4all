/** @type {import('next').NextConfig} */
const nextConfig = {
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
