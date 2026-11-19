/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];

const nextConfig = {
  reactStrictMode: true,
  env: { BUILD_TIME: new Date().toISOString() },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: noindex },
      { source: "/login", headers: noindex },
    ];
  },
};
export default nextConfig;
