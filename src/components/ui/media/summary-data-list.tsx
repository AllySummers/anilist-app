import type { ItemProps } from '@/components/chakra-ui/data-list';
import type { MediaSummary } from '@/gql/media-types';
import { Aired } from './fields/aired';
import { Duration } from './fields/duration';
import { Format } from './fields/format';
import { Genres } from './fields/genres';
import { Status } from './fields/status';
import { Studios } from './fields/studios';

export interface SummaryDataList extends Omit<ItemProps, 'label' | 'value'> {
	media: Pick<
		MediaSummary,
		'genres' | 'studios' | 'duration' | 'status' | 'format' | 'startDate' | 'endDate'
	>;
	maxGenres?: number;
	maxStudios?: number;
}

export const SummaryDataList = ({
	media: { genres, studios, duration, status, format, startDate, endDate },
	maxGenres,
	maxStudios,
	...props
}: SummaryDataList) => (
	<>
		<Genres alignItems="start" genres={genres} max={maxGenres} {...props} />
		<Studios alignItems="start" studios={studios} max={maxStudios} {...props} />
		<Duration alignItems="start" duration={duration} {...props} />
		<Status alignItems="start" status={status} {...props} />
		<Format alignItems="start" format={format} {...props} />
		<Aired alignItems="start" startDate={startDate} endDate={endDate} {...props} />
	</>
);
