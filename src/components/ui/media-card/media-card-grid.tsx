'use client';

import { ClientOnly, Flex } from '@chakra-ui/react';
import type { MediaSummary } from '@/gql/media-types';
import { MediaCard } from './media-card';
import { MediaCardSkeleton } from './media-card-skeleton';

export interface MediaCardGridProps {
	media?: MediaSummary[];
	allowSkeleton?: boolean;
}

// i wasn't able to get this to work without only rendering on the client
// it had hydration issues in the `Flex` component but didn't have trouble with a `div`,
// and if i used a `div` it would move the hydration error to the `Card.Root` component
// in the `MediaCard` component, so i wrapped it in a `ClientOnly` component
export const MediaCardGrid = ({ media, allowSkeleton }: MediaCardGridProps) => {
	if (media) {
		return (
			<ClientOnly>
				<Flex wrap="wrap" gap={8} justify="center" mx={12}>
					{media.map((media, mediaIndex) => (
						<MediaCard key={`${mediaIndex}-${media.id}`} media={media} />
					))}
				</Flex>
			</ClientOnly>
		);
	}

	// if media is not provided and `allowSkeleton` is true, render skeleton cards
	if (allowSkeleton) {
		return (
			<ClientOnly>
				<Flex wrap="wrap" gap={8} justify="center" mx={12}>
					{Array.from({ length: 20 }).map((_, index) => (
						<MediaCardSkeleton key={`media-card-skeleton-${index}`} />
					))}
				</Flex>
			</ClientOnly>
		);
	}

	return null;
};
