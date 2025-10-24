import type { NextConfig } from "next";

// Cache invalidation marker: v2 (2025-10-24)
// Force rebuild to clear Vercel image optimization cache
const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Optimized image sizes: removed 828, 2048, 3840 and unused small sizes
    // Conservative approach: focus on actual usage patterns
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [256, 384, 640],
    // Enable AVIF compression for better performance
    minimumCacheTTL: 60,
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // Turbopack configuration
  experimental: {
    optimizePackageImports: ["framer-motion", "swiper"],
  },

  // Headers for caching static assets
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
