/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "music.163.com"
      },
      {
        protocol: "http",
        hostname: "p1.music.126.net"
      }
    ]
  }
};

export default nextConfig;
