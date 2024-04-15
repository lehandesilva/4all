/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET, // Expose AUTH_SECRET to the application
  },
};

module.exports = nextConfig;
