import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://img.youtube.com/**"),
      new URL("https://cdn.jsdelivr.net/**"),
      new URL("https://flagcdn.com/**"),
    ],
  },
};

export default nextConfig;
