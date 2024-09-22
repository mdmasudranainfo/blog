/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "http://localhost:3000",
  },
  images: {
    domains: ["i.ibb.co"], // Add your allowed domains here
  },
};

export default nextConfig;
