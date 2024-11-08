/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Optional: add custom base path if needed
  // basePath: '/your-base-path',
  // Optional: experimental features
  experimental: {
    appDir: true, // Enable this if using Next.js App Directory structure
  },
  // Optional: adding redirects (ensure /api routes are not redirected)
  async redirects() {
    return [
      {
        source: "/old-route",
        destination: "/new-route",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
