const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  transpilePackages: ['@techytools/uui'],
  experimental: {
    appDir: true,
  },
  sassOptions: {
    // fiber: false,
    includePaths: [__dirname],
  },
  exclude: ['./public'],

  async redirects() {
    return [
      // {
      //   destination: '/prompt',
      //   permanent: false,
      //   source: '/chat',
      // },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
