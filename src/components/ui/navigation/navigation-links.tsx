'use client';

import { Button, Text, type ButtonProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import type { MenuItem } from './navigation';

interface NavigationLinksProps<T extends string> {
	items: MenuItem<T>[];
	isMobile?: boolean;
	buttonProps?: ButtonProps;
}

export const NavigationLinks = <T extends string>({
	items,
	buttonProps,
	isMobile,
}: NavigationLinksProps<T>) => {
	const activeRoute = usePathname();

	return (
		<>
			{items.map((item) => (
				<Fragment key={item.href}>
					{activeRoute === item.href ? (
						<Button
							as={Text}
							variant={isMobile ? 'solid' : 'outline'}
							colorScheme="blue"
							{...buttonProps}
							pointerEvents="none"
						>
							{item.label}
						</Button>
					) : (
						<Button
							asChild
							variant={activeRoute === item.href ? 'solid' : 'ghost'}
							colorScheme={activeRoute === item.href ? 'blue' : undefined}
							{...buttonProps}
						>
							<NextLink href={item.href}>{item.label}</NextLink>
						</Button>
					)}
				</Fragment>
			))}
		</>
	);
};
