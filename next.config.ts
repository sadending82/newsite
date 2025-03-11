import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images : {unoptimized: true},
  output: "export",
  assetPrefix:
  process.env.NODE_ENV === "production"
  ? "https://sadytrd.com"
  : "",
};

export default nextConfig;
