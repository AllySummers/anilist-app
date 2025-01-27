'use client';

import { ClientOnly, Text, VStack } from '@chakra-ui/react';
import type { MediaSummary, MediaType, PageInfo } from '@/gql/media-types';
import { MediaCardGrid } from './media-card-grid';
import { MediaPagination } from './media-pagination';

export interface MediaCardGridProps {
	media?: MediaSummary[];
	page?: PageInfo;
	mediaType: MediaType;
	allowSkeleton?: boolean;
}

export const MediaCardBrowser = ({ media, page, mediaType, allowSkeleton }: MediaCardGridProps) => {
	/* not entirely sure why but i got hydration issues on this too if it wasn't wrapped in `ClientOnly`? */
	return (
		<ClientOnly>
			<VStack gap="8">
				{media || (!media && allowSkeleton) ? (
					<MediaCardGrid media={media} allowSkeleton />
				) : (
					<Text>No media found</Text>
				)}
				<MediaPagination page={page} mediaType={mediaType} />
			</VStack>
		</ClientOnly>
	);
};
