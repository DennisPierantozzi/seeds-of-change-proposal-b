import type { NextConfig } from "next";

// Static export for now: deployable to any host. Remove `output` when server
// features (donations checkout, accounts) arrive.
// NEXT_PUBLIC_BASE_PATH is set by the GitHub Pages workflow (e.g. /repo-name).
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
};

export default nextConfig;
