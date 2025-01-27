'use client';

import { Share } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { siteInfo } from '@/config/site';
import type { MediaType } from '@/graphql/media-types';
import { Button } from '../chakra-ui/button';
import { toaster } from '../chakra-ui/toaster';

export interface ShareMediaButtonProps {
	type: MediaType;
	slug: string | number;
	shareTitle: string;
}

const ShareMediaButtonInternal = ({ type, slug, shareTitle }: ShareMediaButtonProps) => {
	// this component has `use client` and is loaded with `dynamic`, so it should be safe to use `window` here
	// this is so  the share can be used on whatever domain/host

	const handleShare = useCallback(async () => {
		const { origin } = window.location;
		const url = `${origin}/view/${type}/${slug}`;
		const { title } = siteInfo;
		const text = shareTitle;

		if (navigator.share) {
			try {
				await navigator.share({
					title,
					text,
					url,
				});

				toaster.create({
					title: 'Shared successfully!',
					type: 'success',
					duration: 2000,
				});
			} catch {
				toaster.create({
					title: 'Error sharing',
					description: 'There was an error while trying to share',
					duration: 2000,
					type: 'error',
				});
			}
		} else {
			try {
				await navigator.clipboard.writeText(url);

				toaster.create({
					title: 'Copied link to clipboard',
					description: 'You can now paste and share it!',
					type: 'success',
					duration: 2000,
				});
			} catch {
				toaster.create({
					title: 'Error copying link',
					description: 'There was an error while trying to copy the link',
					duration: 2000,
					type: 'error',
				});
			}
		}
	}, [shareTitle, slug, type]);

	return (
		<>
			{/* eslint-disable-next-line @typescript-eslint/no-misused-promises -- disabling because we need an async onClick for navigator */}
			<Button onClick={handleShare} variant="outline">
				Share <Share />
			</Button>
		</>
	);
};

export const ShareMediaButton = dynamic(() => Promise.resolve(ShareMediaButtonInternal), {
	ssr: false,
});
