import { TvMinimal, Book } from 'lucide-react';
import { DataListItem, type ItemProps } from '@/components/chakra-ui/data-list';
import type { MediaDetail } from '@/graphql/media-types';
import { Tags } from './fields/tags';

export interface DetailDataListProps extends Omit<ItemProps, 'label' | 'value'> {
	media: Pick<MediaDetail, 'episodes' | 'chapters' | 'volumes' | 'tags'>;
}

export const DetailDataList = ({
	media: { episodes, chapters, volumes, tags },
	...props
}: DetailDataListProps) => (
	<>
		{typeof episodes === 'number' && (
			<DataListItem
				icon={<TvMinimal />}
				alignItems="start"
				label="Episodes"
				value={episodes}
				{...props}
			/>
		)}
		{typeof chapters === 'number' && (
			<DataListItem
				icon={<Book />}
				alignItems="start"
				label="Chapters"
				value={chapters}
				{...props}
			/>
		)}
		{typeof volumes === 'number' && (
			<DataListItem alignItems="start" label="Volumes" value={volumes} {...props} />
		)}
		<Tags alignItems="start" tags={tags} {...props} />
	</>
);
