import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  experimental: {
    serverComponentsExternalPackages: ["socket.io"],
  },
};


export default nextConfig;
