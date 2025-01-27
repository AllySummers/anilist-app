import { notFound } from 'next/navigation';
import { getUserAction } from '@/actions/user/get-user';
import { MediaDetailModal } from '@/components/ui/media-detail/media-detail-modal';
import { queryAnilistDetails } from '@/gql/anilist-details.query';
import { detailsAnilistQueryMediaTransformer } from '@/graphql/data-transformers/details-query-result';
import { isMediaType, type MediaType } from '@/graphql/media-types';
import { NextPageProps } from '@/types/utility-types';

interface BrowseMediaItemPageParams {
	params: {
		mediaType: MediaType;
		slug: string;
	};
}

export default async function BrowseMediaItemPage({
	params,
}: NextPageProps<BrowseMediaItemPageParams>) {
	const user = await getUserAction();

	const { slug, mediaType } = await params;

	if (!isMediaType(mediaType)) {
		notFound();
	}

	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	const data = await queryAnilistDetails({ variables: { id: Number(slug) } });
	const media = data.data.Media && detailsAnilistQueryMediaTransformer(data.data.Media);

	if (!media) {
		notFound();
	}

	return <MediaDetailModal media={media} />;
}
