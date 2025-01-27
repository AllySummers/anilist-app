import { notFound } from 'next/navigation';
import { getUserAction } from '@/actions/user/get-user';
import { MediaCardBrowser } from '@/components/ui/media-card/media-card-browser';
import { querySearchAnilist } from '@/gql/anilist-search.query';
import { MediaType as AniDBMediaType, MediaSort } from '@/gql/types';
import {
	searchAnilistQueryMediaTransformer,
	searchAnilistQueryPageTransformer,
} from '@/graphql/data-transformers/query-media-result';
import { isMediaType, type MediaType } from '@/graphql/media-types';
import { NextPageProps } from '@/types/utility-types';

interface MediaPageParams {
	params: {
		segments: [mediaType?: MediaType | (string & {}), page?: string, ...rest: string[]];
	};
	// uncomment this to be able to populate search boxes from the query string
	// searchParams: Omit<SearchAnilistQueryVariables, 'type'>;
}

export default async function MediaPage(props: NextPageProps<MediaPageParams>) {
	// uncomment this to be able to populate search boxes from the query string
	// const searchParams = await props.searchParams;
	const {
		segments: [mediaType = 'anime', pageNumberParam = '1'],
	} = await props.params;
	const pageNum = Number(pageNumberParam);

	if (pageNum < 1 || Number.isNaN(pageNum) || !isMediaType(mediaType)) {
		notFound();
	}

	const user = await getUserAction();

	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	const { data } = await querySearchAnilist({
		variables: {
			page: pageNum,
			type: mediaType === 'anime' ? AniDBMediaType.Anime : AniDBMediaType.Manga,
			sort: MediaSort.ScoreDesc,
		},
	});
	// removing any null/undefined values from the media array
	const media = data.Page?.media
		?.flatMap((media) => (media ? searchAnilistQueryMediaTransformer(media) : []))
		.sort((a, b) => Number(b.isAdult) + Number(a.isAdult));

	const page = searchAnilistQueryPageTransformer(data.Page?.pageInfo ?? {});

	return <MediaCardBrowser media={media} page={page} mediaType={mediaType} />;
}
