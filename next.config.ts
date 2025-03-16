import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

export default nextConfig;
