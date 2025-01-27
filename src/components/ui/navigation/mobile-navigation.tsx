'use client';

import { Box, Flex, HStack, IconButton, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import { ColorModeButton } from '@/components/chakra-ui/color-mode';
import {
	DrawerRoot,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	DrawerCloseTrigger,
} from '@/components/chakra-ui/drawer';
import type { NavigationViewpointProps } from './navigation';
import { NavigationLinks } from './navigation-links';
import { ProfileMenu } from './profile-menu';

export const MobileNavigation = <T extends string>({
	items,
	brand,
}: NavigationViewpointProps<T>) => {
	const { open, onOpen, onToggle } = useDisclosure();

	return (
		<Box px={4} shadow="sm" hideFrom="md">
			<Flex h={16} alignItems="center" justifyContent="space-between">
				<Text fontSize="xl" fontWeight="bold">
					{brand}
				</Text>

				<HStack>
					<ColorModeButton />
					<IconButton aria-label="Open menu" variant="ghost" onClick={onOpen}>
						<Menu />
					</IconButton>
					<ProfileMenu />
				</HStack>

				<DrawerRoot open={open} onOpenChange={onToggle}>
					<DrawerContent>
						<DrawerHeader>
							<Text fontSize="xl" fontWeight="bold">
								Menu
							</Text>
							<DrawerCloseTrigger />
						</DrawerHeader>
						<DrawerBody>
							<VStack align="center" width="full" pt={4}>
								<NavigationLinks
									items={items}
									buttonProps={{
										width: 'full',
										justifyContent: 'center',
										fontSize: 'lg',
									}}
								/>
							</VStack>
						</DrawerBody>
					</DrawerContent>
				</DrawerRoot>
			</Flex>
		</Box>
	);
};
