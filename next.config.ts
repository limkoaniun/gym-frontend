import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // For optimized production builds
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
