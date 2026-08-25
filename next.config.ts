import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * The hero is a dark render with wide, smooth gradients, which is exactly
     * where compression banding shows. Next 16 only permits qualities that are
     * declared here, so 90 is opted in alongside the default 75.
     */
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
