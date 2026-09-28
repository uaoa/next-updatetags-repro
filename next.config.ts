import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheHandlers: {
    // A custom handler that wraps Next's own default handler and only logs
    // updateTags calls. Nothing else changes.
    default: require.resolve('./cache-handler.mjs'),
  },
};

export default nextConfig;
