import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/chakra-ui/color-mode';
import type { NavigationViewpointProps } from './navigation';
import { NavigationLinks } from './navigation-links';
import { ProfileMenu } from './profile-menu';

export const DesktopNavigation = <T extends string>({
	items,
	brand,
}: NavigationViewpointProps<T>) => (
	<Box px={4} shadow="sm" hideBelow="md">
		<Flex h={16} alignItems="center" justifyContent="space-between">
			<Text fontSize="xl" fontWeight="bold">
				{brand}
			</Text>

			<HStack>
				<ColorModeButton />
				<NavigationLinks items={items} />
				<ProfileMenu />
			</HStack>
		</Flex>
	</Box>
);
