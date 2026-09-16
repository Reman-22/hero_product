import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/hero_product",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
