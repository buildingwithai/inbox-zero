/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
  // Your existing configurations can be added here
  // For example, if you were using experimental features or webpack customizations
  experimental: {
    // Example: ppr: true, // If you were using Partial Prerendering
  },
  // webpack: (config, { isServer }) => {
  //   // Custom webpack configurations if needed
  //   return config;
  // },
};

export default nextConfig;
