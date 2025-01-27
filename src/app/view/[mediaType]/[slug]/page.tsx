import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUserAction } from '@/actions/user/get-user';
import { MediaDetails } from '@/components/ui/media-detail/media-details';
import { queryAnilistDetails } from '@/gql/anilist-details.query';
import { titlecaseMediaType } from '@/graphql/data-transformers/common-data';
import { detailsAnilistQueryMediaTransformer } from '@/graphql/data-transformers/details-query-result';
import { isMediaType, type MediaType } from '@/graphql/media-types';
import { NextPageProps } from '@/types/utility-types';

interface MediaItemPageParams {
	params: {
		mediaType: MediaType;
		slug: string;
	};
}

export async function generateMetadata({
	params,
}: NextPageProps<MediaItemPageParams>): Promise<Metadata> {
	const { mediaType, slug } = await params;
	// the component should handle invalid auth and not found pages
	if (!isMediaType(mediaType)) {
		return {
			title: 'Not Found',
		};
	}

	return {
		title: `Browsing ${titlecaseMediaType(mediaType)}: ${slug}`,
	};
}

export default async function MediaItemPage({ params }: NextPageProps<MediaItemPageParams>) {
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

	return <MediaDetails media={media} />;
}
