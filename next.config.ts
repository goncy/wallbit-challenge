import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    dynamicIO: false,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "fakestoreapi.com",
      port: '',
      pathname: "/img/**"
    }]
  }
};

export default nextConfig;
