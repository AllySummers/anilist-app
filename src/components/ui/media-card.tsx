import { Image, Skeleton } from '@chakra-ui/react';
import NextImage from 'next/image';
import type { Media } from '@/gql/types';

export interface MediaCardProps {
	media: Media;
}

export const MediaCard = ({ media }: MediaCardProps) => (
	<>
		{media.coverImage?.large ? (
			<Image asChild>
				<NextImage
					loading="lazy"
					src={media.coverImage.large}
					alt={
						media.title?.english ??
						media.title?.romaji ??
						media.title?.native ??
						'Alt text not available'
					}
				/>
			</Image>
		) : (
			<Skeleton />
		)}
	</>
);
