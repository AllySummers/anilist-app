import { Flex } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import { getUserAction } from '@/actions/user/get-user';
import { AnimeCardSkeleton } from '@/components/ui/skeletons/anime-card-skeleton';
import { querySearchAnilist } from '@/gql/anilist-search.query';
import { isMediaType, MediaType } from '@/types/media';
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
		segments: [mediaType = 'anime', page = '1'],
	} = await props.params;
	const pageNum = Number(page);

	if (pageNum < 1 || Number.isNaN(pageNum) || !isMediaType(mediaType)) {
		notFound();
	}

	const user = await getUserAction();

	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	// const { data } = await querySearchAnilist({});

	return (
		<Flex wrap="wrap" gap={8}>
			{Array.from({ length: 100 }).map((_, i) => (
				<AnimeCardSkeleton key={i} />
			))}
		</Flex>
	);
}
