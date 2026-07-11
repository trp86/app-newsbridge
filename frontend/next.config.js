/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable CSS source maps to avoid source-map-js issues on Vercel
  productionBrowserSourceMaps: false,

  webpack: (config, { isServer }) => {
    // Disable source maps for CSS in production
    if (!isServer) {
      config.devtool = false;
    }
    return config;
  },
};

module.exports = nextConfig;
