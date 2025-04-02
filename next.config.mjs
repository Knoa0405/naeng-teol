/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.CLOUDFRONT_DOMAIN || "",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
