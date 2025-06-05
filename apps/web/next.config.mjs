import nextMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
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

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
