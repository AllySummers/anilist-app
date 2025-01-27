import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUserAction } from '@/actions/user/get-user';
import { MediaCardBrowser } from '@/components/ui/media-card/media-card-browser';
import { querySearchAnilist } from '@/gql/anilist-search.query';
import { MediaType as AniDBMediaType, MediaSort } from '@/gql/types';
import { titlecaseMediaType } from '@/graphql/data-transformers/common-data';
import {
	searchAnilistQueryMediaTransformer,
	searchAnilistQueryPageTransformer,
} from '@/graphql/data-transformers/query-media-result';
import { isMediaType, type MediaType } from '@/graphql/media-types';
import { NextPageProps } from '@/types/utility-types';

interface MediaPageParams {
	params: {
		// using the union to get autocompletion but also ensure the type is accurate
		segments: [mediaType?: MediaType | (string & {}), page?: string, ...rest: string[]];
	};
	// uncomment this to be able to populate search boxes from the query string
	// searchParams: Omit<SearchAnilistQueryVariables, 'type'>;
}

interface InitializedParams {
	mediaType?: MediaType | (string & {});
	page: number;
	restParams?: string[];
}

const initializeParams = ({
	segments: [mediaType, page = '1', ...restParams],
}: MediaPageParams['params']): InitializedParams => ({
	mediaType,
	page: Number(page),
	restParams,
});

const validateParams = (
	props: InitializedParams,
): props is {
	mediaType: MediaType;
	page: number;
} => {
	const { mediaType, page, restParams } = props;
	const pageNum = Number(page);

	return (
		(isMediaType(mediaType) && Number.isInteger(pageNum) && pageNum > 0) || !restParams?.length
	);
};

export async function generateMetadata({
	params,
}: NextPageProps<MediaPageParams>): Promise<Metadata> {
	const initializedParams = initializeParams(await params);
	if (!validateParams(initializedParams)) {
		return {
			// they should be redirected to the 404 in the MediaPage component
			title: 'Invalid Page',
		};
	}

	const { mediaType, page } = initializedParams;

	return {
		title: `Browsing ${titlecaseMediaType(mediaType)} - Page ${page}`,
	};
}

export default async function MediaPage(props: NextPageProps<MediaPageParams>) {
	// uncomment this to be able to populate search boxes from the query string
	// const searchParams = await props.searchParams;
	const params = initializeParams(await props.params);
	if (!validateParams(params)) {
		notFound();
	}
	const { mediaType, page: pageNumber } = params;

	const user = await getUserAction();

	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	const { data } = await querySearchAnilist({
		variables: {
			page: pageNumber,
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
