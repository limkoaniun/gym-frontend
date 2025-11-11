import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // output: 'standalone', // Temporarily disabled - causing module resolution issues on EC2
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
