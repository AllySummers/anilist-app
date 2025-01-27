'use client';
import { VStack, Heading, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { logoutUserAction } from '@/actions/user/logout-user';

// this component exists so we can set the title metadata on the server, as you can't set it on the client with the `export const metadata`

export const Logout = () => {
	const router = useRouter();

	useEffect(() => {
		void logoutUserAction().then(() => {
			router.refresh();
		});
	}, [router]);

	return (
		<VStack gap={12}>
			<Heading as="h1">Successfully logged out</Heading>
			<Text>
				To continue using the application, please{' '}
				<Link variant="underline" colorPalette="teal" asChild>
					<NextLink href="/register">sign in again</NextLink>
				</Link>
				.
			</Text>
		</VStack>
	);
};
