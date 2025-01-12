/**
 * @fileoverview
 * The components in this file are adapted from the Chakra UI docs.
 * See here for original source: https://github.com/chakra-ui/chakra-ui/blob/main/apps/www/components/docs/header.tsx
 */
import { Box, Container, HStack, IconButton, Portal, Spacer, VStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ColorModeButton } from '@/components/chakra-ui/color-mode';
import { AnilistLogo } from '@/components/ui/anilist-logo';
import { HeaderRoot } from './header.client';

const HeaderLogoLink = () => (
	<Link asChild>
		<NextLink href="/" aria-label="Anime Explorer Homepage">
			<AnilistLogo />
		</NextLink>
	</Link>
);

const HeaderMobileActions = () => (
	<HStack>
		<ColorModeButton />
	</HStack>
);

const HeaderMobileNavbar = () => (
	<HStack hideFrom="md" h="full">
		<HeaderLogoLink />
		<Spacer />
		<HeaderMobileActions />
	</HStack>
);

const HeaderDesktopActions = () => (
	<HStack gap="2" minH="48px" flexShrink="1" minW="0">
		<ColorModeButton />
	</HStack>
);

const HeaderDesktopNavbar = () => (
	<Box hideBelow="md">
		<HStack py="2">
			<Spacer />
			<HeaderDesktopActions />
		</HStack>
	</Box>
);

export const Header = () => {
	return (
		<HeaderRoot>
			<Container>
				<HeaderDesktopNavbar />
				<HeaderMobileNavbar />
			</Container>
		</HeaderRoot>
	);
};
