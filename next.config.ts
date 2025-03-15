import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images : {
    loader: 'akamai',
    path: '/',
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: "export",
  assetPrefix:
  process.env.NODE_ENV === "production"
  ? "https://sadytrd.com"
  : "",
};

export default nextConfig;
