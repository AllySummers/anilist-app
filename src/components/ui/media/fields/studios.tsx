import { HStack } from '@chakra-ui/react';
import { DataListItem, type ItemProps } from '@/components/chakra-ui/data-list';
import type { MediaStudio } from '@/graphql/media-types';
import { TagList } from '../../tag-list';
import { useList } from '../use-list';

export interface StudiosProps extends Omit<ItemProps, 'label' | 'value'> {
	studios?: MediaStudio[];
	max?: number;
}

export const Studios = ({ studios, max = Number.POSITIVE_INFINITY, ...props }: StudiosProps) => {
	const { items, keyFn, totalLength } = useList(studios, { max, getKey: (studio) => studio.id });

	// the items check isn't necessary but it's just for making typescript quiet when we use the total count below
	if (totalLength === 0 || !items) {
		return null;
	}

	return (
		<DataListItem
			label={`Studios (${totalLength})`}
			value={
				<HStack gap="2" wrap="wrap">
					<TagList variant="outline" tags={items} tagKey={keyFn}>
						{(studio) => studio.name}
					</TagList>
				</HStack>
			}
			{...props}
		></DataListItem>
	);
};
