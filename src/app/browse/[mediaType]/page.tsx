import { notFound } from 'next/navigation';
import { getUser } from '@/actions/get-user';
import { AnimeCardSkeleton } from '@/components/ui/skeletons/anime-card-skeleton';
import { querySearchAnilist, type SearchAnilistQueryVariables } from '@/gql/anilist-search.query';
import { isMediaType, MediaType } from '@/types/media';
import { NextPageProps } from '@/types/utility-types';

interface MediaPageParams {
	params: {
		mediaType: MediaType;
	};
	searchParams: Omit<SearchAnilistQueryVariables, 'type'>;
}

export default async function MediaPage(props: NextPageProps<MediaPageParams>) {
	const searchParams = await props.searchParams;
	const { mediaType } = await props.params;

	if (!isMediaType(mediaType)) {
		notFound();
	}

	const user = await getUser();

	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	const { data } = await querySearchAnilist({ variables: searchParams });

	return (
		<>
			<AnimeCardSkeleton />
			Anime
			{data.Page?.media?.map((item) => (
				<div key={item?.id}>
					<h2>{item?.title?.english}</h2>
					<p>{item?.description}</p>
				</div>
			))}
		</>
	);
}
