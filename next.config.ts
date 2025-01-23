import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		// to avoid expensive bills from vercel 🙃
		unoptimized: true,
	},
	experimental: {
		// recommended as per chakra docs: https://www.chakra-ui.com/docs/get-started/frameworks/next-app#optimize-bundle
		optimizePackageImports: ['@chakra-ui/react'],
		// gives statically typed routes, as per here: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#statically-typed-links
		typedRoutes: true,
	},
};

export default nextConfig;
