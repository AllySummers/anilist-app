import { Container, SkipNavLink, Text } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import { getUser } from '@/actions/get-user';
import { ApolloWrapper } from '@/apollo/wrapper';
import { Provider as ChakraProvider } from '@/components/chakra-ui/provider';
import { Navigation } from '@/components/ui/navigation/navigation';
import { navigationItems } from '@/config/navigation';
import { siteInfo } from '@/config/site';
import { UserStoreProvider } from '@/stores/user-store/user-store-context';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = siteInfo;

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await getUser();

	return (
		// suppression hydration warning is required to prevent warnings about the next-themes library, and recommended by chakra ui docs:
		// https://www.chakra-ui.com/docs/get-started/frameworks/next-app#optimize-bundle
		<html lang="en" suppressHydrationWarning>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<UserStoreProvider value={user}>
					<ApolloWrapper>
						<ChakraProvider>
							<SkipNavLink>Skip to Content</SkipNavLink>
							<Navigation
								brand={
									<Link href="/">
										<Text as="span">{siteInfo.title}</Text>
									</Link>
								}
								items={navigationItems}
							/>
							<Container m="0" p="0">
								{children}
							</Container>
						</ChakraProvider>
					</ApolloWrapper>
				</UserStoreProvider>
			</body>
		</html>
	);
}
