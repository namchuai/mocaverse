/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "i.seadn.io",
      },
    ],
  },
};

module.exports = nextConfig;
