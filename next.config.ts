import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Default is 1 MB, which rejects almost every phone photo.
      // Matches MAX_BYTES in the upload action (plus form overhead).
      bodySizeLimit: "16mb",
    },
  },
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
