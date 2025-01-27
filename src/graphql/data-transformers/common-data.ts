import type * as Types from '@/gql';
import type { MediaType } from '../media-types';

export const transformFormat = (format: Types.MediaFormat | `${Types.MediaFormat}`) => {
	switch (format) {
		case 'TV':
			return 'TV Show';
		case 'TV_SHORT':
			return 'TV Short';
		case 'MOVIE':
			return 'Movie';
		case 'SPECIAL':
			return 'Special';
		case 'OVA':
			return 'OVA';
		case 'ONA':
			return 'ONA';
		case 'MUSIC':
			return 'Music';
		case 'MANGA':
			return 'Manga';
		case 'NOVEL':
			return 'Novel';
		case 'ONE_SHOT':
			return 'One Shot';
		default:
			return format;
	}
};

export const transformStatus = (status: Types.MediaStatus | `${Types.MediaStatus}`) => {
	switch (status) {
		case 'FINISHED':
			return 'Finished';
		case 'RELEASING':
			return 'Releasing';
		case 'NOT_YET_RELEASED':
			return 'Not Yet Released';
		case 'CANCELLED':
			return 'Cancelled';
		case 'HIATUS':
			return 'Hiatus';
		default:
			return status;
	}
};

export const transformSource = (source: Types.MediaSource | `${Types.MediaSource}`) => {
	switch (source) {
		case 'ORIGINAL':
			return 'Original';
		case 'MANGA':
			return 'Manga';
		case 'LIGHT_NOVEL':
			return 'Light Novel';
		case 'VISUAL_NOVEL':
			return 'Visual Novel';
		case 'VIDEO_GAME':
			return 'Video Game';
		case 'OTHER':
			return 'Other';
		case 'NOVEL':
			return 'Novel';
		case 'DOUJINSHI':
			return 'Doujinshi';
		case 'ANIME':
			return 'Anime';
		case 'WEB_NOVEL':
			return 'Web Novel';
		case 'COMIC':
			return 'Comic';
		case 'GAME':
			return 'Game';
		case 'LIVE_ACTION':
			return 'Live Action';
		case 'MULTIMEDIA_PROJECT':
			return 'Multimedia Project';
		case 'PICTURE_BOOK':
			return 'Picture Book';
		default:
			return source;
	}
};
type TitleSortKeys = keyof Omit<Types.MediaTitle, '__typename'>;

const DEFAULT_TITLE_ORDER = [
	'english',
	'romaji',
	'native',
	'userPreferred',
] as const satisfies TitleSortKeys[];

export const getTitle = (
	title: Types.MediaTitle,
	order: readonly TitleSortKeys[] = DEFAULT_TITLE_ORDER,
) => {
	const key = order.find((key) => title[key]);
	return (key ? title[key] : undefined) ?? 'Unknown Title';
};

export const transformFuzzyDate = (date: Types.FuzzyDate): string =>
	[date.year ?? '????', date.month ?? '??', date.day ?? '??'].join('/');

export const uppercaseMediaType = (type: MediaType | Uppercase<MediaType>): Uppercase<MediaType> =>
	type.toUpperCase() as Uppercase<MediaType>;

export const lowercaseMediaType = (type: MediaType | Uppercase<MediaType>): Lowercase<MediaType> =>
	type.toLowerCase() as Lowercase<MediaType>;
