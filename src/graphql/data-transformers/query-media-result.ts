import type * as SearchAnilistQuery from '@/gql/anilist-search.query';
import type { MediaSummary, PageInfo } from '@/gql/media-types';
import { nonNullableArray, nonNullableKeys } from './base-transformers';

export const searchAnilistQueryMediaTransformer = (
	data: SearchAnilistQuery.SearchAnilistQuery_Page_Page_media_Media,
): MediaSummary => {
	const genres = nonNullableArray(data.genres ?? []);
	const title = nonNullableKeys(data.title ?? {}, 'english', 'romaji', 'native');
	const coverImage = nonNullableKeys(data.coverImage ?? {}, 'extraLarge', 'large', 'medium');
	const studios = data.studios?.edges?.flatMap((edge) =>
		edge?.node
			? {
					id: edge.node.id,
					name: edge.node.name,
					isMain: edge.isMain,
				}
			: [],
	);
	const startDate = nonNullableKeys(data.startDate ?? {}, 'year', 'month', 'day');
	const endDate = nonNullableKeys(data.endDate ?? {}, 'year', 'month', 'day');

	return nonNullableKeys(
		{
			...data,
			genres,
			title,
			coverImage,
			studios,
			startDate,
			endDate,
		},
		'meanScore',
		'coverImage',
		'description',
		'duration',
		'endDate',
		'format',
		'genres',
		'id',
		'isAdult',
		'startDate',
		'title',
		'type',
		'status',
		'studios',
	);
};

export const searchAnilistQueryPageTransformer = (
	data: SearchAnilistQuery.SearchAnilistQuery_Page_Page_pageInfo_PageInfo,
): PageInfo => nonNullableKeys(data, 'currentPage', 'lastPage', 'hasNextPage', 'perPage');
