'use client';

import { useMemo } from 'react';
import type { MediaSummary } from '@/gql/media-types';
import { getTitle } from '@/graphql/data-transformers/common-data';
import { MediaSummaryCard } from './media-summary-card';

export interface MediaCardProps {
	media: MediaSummary;
}

export const MediaCard = ({ media }: MediaCardProps) => {
	const imgSrc =
		media.coverImage?.extraLarge ??
		media.coverImage?.large ??
		media.coverImage?.medium ??
		undefined;

	const title = useMemo(() => getTitle(media.title), [media.title]);

	return <MediaSummaryCard media={media} title={title} imgSrc={imgSrc} />;
};
