import { Container, SkipNavLink, Text } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { ApolloWrapper } from '@/apollo/wrapper';
import { Provider as ChakraProvider } from '@/components/chakra-ui/provider';
import { Navigation } from '@/components/ui/navigation/navigation';
import { navigationItems } from '@/config/navigation';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Anime Explorer',
	description: 'Anime Explorer GraphQL Demo for Leonardo.ai',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		// suppression hydration warning is required to prevent warnings about the next-themes library, and recommended by chakra ui docs:
		// https://www.chakra-ui.com/docs/get-started/frameworks/next-app#optimize-bundle
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ApolloWrapper>
					<ChakraProvider>
						<SkipNavLink>Skip to Content</SkipNavLink>
						<Navigation
							brand={
								<Link href="/">
									<Text>Anime Explorer</Text>
								</Link>
							}
							items={navigationItems}
						/>
						<Container>{children}</Container>
					</ChakraProvider>
				</ApolloWrapper>
			</body>
		</html>
	);
}
