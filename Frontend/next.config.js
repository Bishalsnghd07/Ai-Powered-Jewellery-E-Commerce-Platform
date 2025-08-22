/** @type {import('next').NextConfig} */
const nextConfig = {};

// module.exports = nextConfig

module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain
    // loader: "cloudinary", // Optional
    // path: "https://res.cloudinary.com/delevx3ej", // Optional
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*",
      },
    ];
  },
};
