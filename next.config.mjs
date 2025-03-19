/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    nodeMiddleware: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
