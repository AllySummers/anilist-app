'use client';

import { ImageOff } from 'lucide-react';
import { EmptyState, type EmptyStateProps } from '@/components/chakra-ui/empty-state';

export type ImageFallbackProps = Omit<EmptyStateProps, 'title' | 'icon'> & {
	title?: string;
};

export const ImageFallback = ({ title, children, ...props }: ImageFallbackProps) => (
	<EmptyState title={title ?? 'Image Not Available'} icon={<ImageOff />} p="0" {...props}>
		{children}
	</EmptyState>
);
