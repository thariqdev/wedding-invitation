/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Native Next.js build — Vercel/Netlify serve it directly. All pages are
  // static (prerendered), so no server runtime is needed.
  images: { unoptimized: true },
};

export default nextConfig;
