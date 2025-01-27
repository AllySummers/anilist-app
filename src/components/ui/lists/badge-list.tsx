import { Badge, type BadgeProps } from '@chakra-ui/react';
import type { Key, ReactNode } from 'react';

interface PrimitiveBadgeProps<T extends string | number> {
	badges: readonly T[];
	badgeKey?: (badge: T, index: number) => Key;
	children?: never;
}

interface ObjectBadgeProps<T> {
	badges: readonly T[];
	badgeKey: (badge: T, index: number) => Key;
	children?: (badge: T, index: number) => ReactNode;
}

export type BadgeListProps<T> = Omit<BadgeProps, 'children'> &
	(T extends string | number ? PrimitiveBadgeProps<T> : ObjectBadgeProps<T>);

export const BadgeList = <T,>({
	badges,
	badgeKey = (_, index) => index,
	children,
	...badgeProps
}: BadgeListProps<T>) => (
	<>
		{badges.map((badge, badgeIndex) => (
			<Badge key={badgeKey(badge, badgeIndex)} {...badgeProps}>
				{children ? children(badge, badgeIndex) : badge}
			</Badge>
		))}
	</>
);
