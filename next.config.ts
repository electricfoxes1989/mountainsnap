import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      // French is the default language; old unprefixed URLs keep working.
      { source: "/", destination: "/fr", permanent: false },
      { source: "/station/:id", destination: "/fr/station/:id", permanent: false },
    ];
  },
};

export default nextConfig;
