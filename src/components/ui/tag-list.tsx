import type { Key, ReactNode } from 'react';
import { Tag, type TagProps } from '@/components/chakra-ui/tag';

interface PrimitiveTagProps<T extends string | number> {
	tags: readonly T[];
	tagKey?: (tag: T, index: number) => Key;
	children?: never;
}

interface ObjectTagProps<T> {
	tags: readonly T[];
	tagKey: (tag: T, index: number) => Key;
	children?: (tag: T, index: number) => ReactNode;
}

export type TagListProps<T> = Omit<TagProps, 'children'> &
	(T extends string | number ? PrimitiveTagProps<T> : ObjectTagProps<T>);

export const TagList = <T,>({
	tags,
	tagKey = (_, index) => index,
	children,
	...tagProps
}: TagListProps<T>) => (
	<>
		{tags.map((tag, tagIndex) => (
			<Tag key={tagKey(tag, tagIndex)} {...tagProps}>
				{children ? children(tag, tagIndex) : tag}
			</Tag>
		))}
	</>
);
