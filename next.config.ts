import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // output: 'standalone', // Temporarily disabled - causing module resolution issues on EC2
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
