'use client';

import { Button } from '@chakra-ui/react';
import { EyeOff } from 'lucide-react';
import { useState } from 'react';
import { EmptyState, type EmptyStateProps } from '@/components/chakra-ui/empty-state';

export type ImageSpoilerProps = Omit<EmptyStateProps, 'title' | 'icon'>;

export const ImageSpoiler = ({ children, ...props }: ImageSpoilerProps) => {
	const [maskImage, setMaskImage] = useState(true);

	if (maskImage) {
		return (
			<EmptyState title="Image Hidden" icon={<EyeOff />} p="0" {...props}>
				<Button onClick={() => setMaskImage(false)}>Show Content</Button>
			</EmptyState>
		);
	}

	return children;
};
