import { List as ChakraList, type ListItemProps, type ListRootProps } from '@chakra-ui/react';
import type { Key, ReactNode } from 'react';

interface PrimitiveListProps<T extends string | number> {
	items: readonly T[];
	itemKey?: (item: T, index: number) => Key;
	children?: never;
}

interface ObjectListProps<T> {
	items: readonly T[];
	itemKey: (item: T, index: number) => Key;
	children?: (item: T, index: number) => ReactNode;
}

export type ListProps<T> = Omit<ListItemProps, 'children'> & {
	rootProps?: Omit<ListRootProps, 'children'>;
} & (T extends string | number ? PrimitiveListProps<T> : ObjectListProps<T>);

export const List = <T,>({
	items,
	itemKey = (_, index) => index,
	children,
	rootProps,
	...listProps
}: ListProps<T>) => (
	<ChakraList.Root {...rootProps}>
		{items.map((item, listIndex) => (
			<ChakraList.Item key={itemKey(item, listIndex)} {...listProps}>
				{children ? children(item, listIndex) : item}
			</ChakraList.Item>
		))}
	</ChakraList.Root>
);
