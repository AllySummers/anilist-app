import type * as DetailsAnilistQuery from '@/gql/anilist-details.query';
import type { MediaDetail } from '@/gql/media-types';
import { nonNullableArray, nonNullableKeys } from './base-transformers';

// not sure why but for some reason typescript complained if i
// used the `searchAnilistQueryMediaTransformer` and then the rest
// with this? so i had to copy it all in
export const detailsAnilistQueryMediaTransformer = (
	data: DetailsAnilistQuery.AnilistDetailsQuery_Media_Media,
): MediaDetail => {
	const characters = data.characterPreview?.edges?.flatMap((edge) =>
		edge?.node
			? {
					id: edge.node.id,
					name: edge.node.name?.userPreferred,
					voiceActors: edge.voiceActors?.flatMap((va) =>
						va && typeof va.id === 'number'
							? nonNullableKeys(
									{
										id: va?.id,
										name: va?.name?.userPreferred,
										language: va?.language,
									},
									'id',
									'name',
									'language',
								)
							: [],
					),
					role: edge.role,
					img: edge.node.image
						? nonNullableKeys(edge.node.image, 'large', 'medium')
						: undefined,
				}
			: [],
	);

	const coverImage = nonNullableKeys(data.coverImage ?? {}, 'extraLarge', 'large', 'medium');
	const tags = data.tags?.flatMap((tag) =>
		tag
			? nonNullableKeys(
					tag,
					'description',
					'id',
					'isGeneralSpoiler',
					'isMediaSpoiler',
					'name',
					'rank',
				)
			: [],
	);
	const genres = nonNullableArray(data.genres ?? []);
	const title = nonNullableKeys(data.title ?? {}, 'english', 'romaji', 'native');
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
	const synonyms = nonNullableArray(data.synonyms ?? []);

	return nonNullableKeys(
		{
			...data,
			tags,
			coverImage,
			characters,
			genres,
			title,
			studios,
			startDate,
			endDate,
			synonyms,
		},
		'averageScore',
		'bannerImage',
		'chapters',
		'characterPreview',
		'countryOfOrigin',
		'coverImage',
		'description',
		'duration',
		'endDate',
		'episodes',
		'favourites',
		'format',
		'genres',
		'hashtag',
		'id',
		'isAdult',
		'meanScore',
		'popularity',
		'source',
		'startDate',
		'status',
		'studios',
		'synonyms',
		'tags',
		'title',
		'trending',
		'type',
		'volumes',
	);
};
