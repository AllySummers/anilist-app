import type * as Types from '@/gql';

// preferring to avoid enums but wanting to make sure it is up to date with the gql schema
export type MediaType = `${Lowercase<Types.MediaType>}`;

export const MEDIA_TYPES = ['anime', 'manga'] as const satisfies ReadonlyArray<MediaType>;

export const isMediaType = (value?: unknown): value is MediaType =>
	typeof value === 'string' && MEDIA_TYPES.includes(value as MediaType);

export interface MediaTitles {
	english?: string;
	romaji?: string;
	native?: string;
}

export interface MediaCoverImage {
	extraLarge?: string;
	large?: string;
	medium?: string;
}

export interface MediaStudio {
	isMain: boolean;
	id: number;
	name: string;
}

export interface MediaSummary {
	coverImage?: MediaCoverImage;
	description?: string;
	duration?: number;
	endDate: Types.FuzzyDate;
	format?: `${Types.MediaFormat}`;
	genres?: string[];
	id: number;
	isAdult?: boolean;
	popularity?: number;
	startDate: Types.FuzzyDate;
	status?: `${Types.MediaStatus}`;
	type?: `${Types.MediaType}`;
	studios?: MediaStudio[];
	synonyms?: string[];
	title: MediaTitles;
	meanScore?: number;
}

export interface PageInfo {
	total?: number;
	perPage?: number;
	currentPage?: number;
	lastPage?: number;
	hasNextPage?: boolean;
}

export type MediaExternalLink = {
	id: number;
	site: string;
	url?: string;
	type?: Types.ExternalLinkType;
	language?: string;
	color?: string;
	icon?: string;
	notes?: string;
	isDisabled?: boolean;
};

export type MediaRanking = {
	id: number;
	rank: number;
	type: Types.MediaRankType;
	format: Types.MediaFormat;
	year?: number;
	season?: Types.MediaSeason;
	allTime?: boolean;
	context: string;
};

export type MediaTag = {
	id: number;
	name: string;
	description?: string;
	rank?: number;
	isMediaSpoiler?: boolean;
	isGeneralSpoiler?: boolean;
};

export interface MediaVoiceActor {
	id: number;
	name?: string;
	language?: string;
}

export interface CharacterCoverImage {
	large?: string;
	medium?: string;
}

export interface MediaCharacter {
	id: number;
	name: string;
	voiceActors: MediaVoiceActor[];
	role: string;
	img?: CharacterCoverImage;
}

export interface MediaDetail extends MediaSummary {
	bannerImage?: string;
	episodes?: number;
	chapters?: number;
	volumes?: number;
	source?: `${Types.MediaSource}`;
	averageScore?: number;
	favourites?: number;
	hashtag?: string;
	countryOfOrigin?: string;
	tags?: MediaTag[];
	characters?: MediaCharacter[];
	coverImage?: MediaCoverImage;
}
