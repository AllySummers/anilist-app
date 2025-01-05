import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// recommended as per chakra docs: https://www.chakra-ui.com/docs/get-started/frameworks/next-app#optimize-bundle
	optimizePackageImports: ['@chakra-ui/react'],
};

export default nextConfig;
