'use client';

import { Image, type SystemStyleObject, type ImageProps } from '@chakra-ui/react';
import { useMemo } from 'react';
import { ImageFallback } from '@/components/ui/image-fallback';
import { ImageSpoiler } from '@/components/ui/image-spoiler';

export interface MediaCardBannerImageProps {
	isAdult?: boolean;
	src?: string;
	alt: string;
}

const commonProps = {
	width: 'full',
	height: 'md',
	shadow: 'xl',
	marginBottom: '2',
} satisfies SystemStyleObject;

const flexProps = {
	...commonProps,
	display: 'flex',
	flexDirection: 'column',
	gap: 8,
	justifyContent: 'center',
} satisfies SystemStyleObject;

const imgBaseProps = {
	...commonProps,
	fit: 'cover',
} satisfies ImageProps;

export const MediaCardBannerImage = ({ isAdult, src, alt }: MediaCardBannerImageProps) => {
	const imgProps = useMemo<ImageProps>(
		() => ({
			...imgBaseProps,
			src,
			alt,
		}),
		[src, alt],
	);

	if (!src) {
		return <ImageFallback {...flexProps} />;
	}

	if (isAdult) {
		return (
			<ImageSpoiler {...flexProps}>
				{/* eslint-disable-next-line jsx-a11y/alt-text -- this is specified in the `imgProps` above so we can ignore */}
				<Image {...imgProps} />
			</ImageSpoiler>
		);
	}

	// eslint-disable-next-line jsx-a11y/alt-text -- this is specified in the `imgProps` above so we can ignore
	return <Image {...imgProps} />;
};
