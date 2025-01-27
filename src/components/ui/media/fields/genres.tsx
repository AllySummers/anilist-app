import { HStack } from '@chakra-ui/react';
import { DataListItem, type ItemProps } from '@/components/chakra-ui/data-list';
import { TagList } from '../../tag-list';
import { useList } from '../use-list';

export interface GenresProps extends Omit<ItemProps, 'label' | 'value'> {
	genres?: string[];
	max?: number;
}

export const Genres = ({ genres, max = Number.POSITIVE_INFINITY, ...props }: GenresProps) => {
	const { items, keyFn, totalLength } = useList(genres, { max });
	// the genres.length isn't necessary but it's just for making typescript quiet when we use the total count below
	if (totalLength === 0 || !items) {
		return null;
	}

	return (
		<DataListItem
			label={`Genres (${totalLength})`}
			value={
				<HStack gap="2" wrap="wrap">
					<TagList variant="outline" tags={items} tagKey={keyFn} />
				</HStack>
			}
			{...props}
		></DataListItem>
	);
};
