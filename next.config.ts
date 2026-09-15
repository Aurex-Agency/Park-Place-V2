import type { NextConfig } from "next";

/**
 * Sent with every response.
 *
 * Vercel already supplies HSTS. These are the rest of the baseline for a site
 * that collects a name, a telephone number and an email address: stop the
 * browser second guessing a declared content type, stop the site being framed
 * by somebody else's page and clicked through, keep the full URL from leaking
 * to other origins on the way out, and switch off device access the site never
 * asks for.
 *
 * There is deliberately no full Content-Security-Policy here. A real one has
 * to account for the framework's inline bootstrap and would need to be built
 * and tested against every page rather than guessed at in a config file; a
 * half right CSP that silently breaks a booking form is worse than none.
 * frame-ancestors is the one directive that can be set safely on its own, and
 * it is the one that matters for clickjacking.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    /**
     * The layout stylesheet goes into the document instead of being fetched.
     *
     * It is 10.5KB and it was the only render-blocking request on every page:
     * first paint could not happen until a second round trip completed, and on
     * a throttled connection it was competing for bandwidth with two preloaded
     * fonts. Inlined, first paint waits on the document alone.
     *
     * The tradeoff is that the CSS is no longer cached separately across
     * navigations. For a site this size, where the whole stylesheet is smaller
     * than one of the fonts, removing the round trip is the better side of it.
     */
    inlineCss: true,
  },
  images: {
    /**
     * The hero is a dark render with wide, smooth gradients, which is exactly
     * where compression banding shows. Next 16 only permits qualities that are
     * declared here, so 90 is opted in alongside the default 75.
     */
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
