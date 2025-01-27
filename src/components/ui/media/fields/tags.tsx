import { HStack } from '@chakra-ui/react';
import { DataListItem, type ItemProps } from '@/components/chakra-ui/data-list';
import type { MediaTag } from '@/graphql/media-types';
import { TagList } from '../../tag-list';
import { useList } from '../use-list';

export interface TagsProps extends Omit<ItemProps, 'label' | 'value'> {
	tags?: MediaTag[];
	max?: number;
}

export const Tags = ({ tags, max = Number.POSITIVE_INFINITY, ...props }: TagsProps) => {
	const { items, keyFn, totalLength } = useList(tags, { max, getKey: (tag) => tag.id });

	// the items check isn't necessary but it's just for making typescript quiet when we use the total count below
	if (totalLength === 0 || !items) {
		return null;
	}

	return (
		<DataListItem
			pt="2"
			label={`Tags (${totalLength})`}
			value={
				<HStack gap="2" wrap="wrap">
					<TagList variant="outline" tags={items} tagKey={keyFn}>
						{(tag) => tag.name}
					</TagList>
				</HStack>
			}
			{...props}
		></DataListItem>
	);
};
