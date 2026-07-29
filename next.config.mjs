/**
 * Content-Security-Policy for a fully static site: no backend, no third-party
 * scripts, no analytics, no embeds. Everything the page needs it serves itself,
 * so every directive can be pinned to 'self'.
 *
 * The two 'unsafe-inline' allowances are load-bearing, not laziness:
 *   script-src  Next inlines the RSC payload as `self.__next_f.push(...)`.
 *               Replacing that with a nonce means a nonce per request, which
 *               means per-request rendering — it would trade static generation
 *               for a directive that guards against nothing here.
 *   style-src   GSAP and Lenis write to element.style, and next/font emits an
 *               inline <style> block. Both fall under style-src.
 *
 * `data:` on img-src covers the inline SVG data URIs in the CSS.
 */
// `next dev` compiles with eval and holds an HMR socket open, so the policy the
// site ships would break the one environment where it gets edited. This
// relaxation is dev-only; it never reaches a deployed build.
const isDev = process.env.NODE_ENV !== "production";
const devScript = isDev ? " 'unsafe-eval'" : "";
const devConnect = isDev ? " ws: http://localhost:* ws://localhost:*" : "";

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${devScript}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${devConnect}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  // The site never asks for a device. Denying up front means a future dependency
  // cannot quietly start asking on its behalf.
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "camera=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
    ].join(", "),
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
