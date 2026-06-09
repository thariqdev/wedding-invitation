/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export → produces ./out, deployable to Netlify / any static host
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
