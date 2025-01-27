'use client';

import { Flex, Grid, Heading, Separator } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { DataListRoot } from '@/components/chakra-ui/data-list';
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from '@/components/chakra-ui/dialog';
import { Prose } from '@/components/chakra-ui/prose';
import { Tooltip } from '@/components/chakra-ui/tooltip';
import { getTitle, lowercaseMediaType } from '@/graphql/data-transformers/common-data';
import type { MediaDetail } from '@/graphql/media-types';
import { DetailDataList } from '../media/media-details-list';
import { SummaryDataList } from '../media/summary-data-list';
import { MediaAdult } from '../media-adult';
import { ShareMediaButton } from '../media-link';
import { MediaScore } from '../media-score';
import { MediaCardBannerImage } from './media-banner-image';

export interface MediaDetailModalProps {
	media: MediaDetail;
}

export const MediaDetailModal = ({ media }: MediaDetailModalProps) => {
	const { description, bannerImage, isAdult, meanScore = 0 } = media;
	const title = useMemo(() => getTitle(media.title), [media.title]);

	const router = useRouter();

	return (
		<DialogRoot
			defaultOpen
			size="xl"
			closeOnInteractOutside
			onExitComplete={() => router.back()}
		>
			<DialogContent>
				<DialogCloseTrigger />
				<DialogHeader
					display="flex"
					justifyContent="space-between"
					alignItems="start"
					flexDirection="row"
				>
					<Tooltip content={title}>
						<DialogTitle lineClamp="2">{title}</DialogTitle>
					</Tooltip>
					<Flex
						direction="column"
						justifyContent="space-between"
						gap="1"
						align="end"
						marginRight="5"
					>
						{isAdult && <MediaAdult />}
						{meanScore >= 50 && <MediaScore score={meanScore} steps={[50, 70, 90]} />}
					</Flex>
				</DialogHeader>
				<DialogBody gap="3" pt="5" flexDirection="column" display="flex">
					<MediaCardBannerImage src={bannerImage} isAdult={isAdult} alt={title} />
					<Grid
						templateColumns={{ base: 'auto', md: '4fr min-content 3fr' }}
						gap="inherit"
					>
						<Flex direction="column" flex="1" gap="inherit" justify="space-between">
							<DataListRoot
								orientation="horizontal"
								variant="subtle"
								gap="3"
								alignContent="start"
								divideY="1px"
							>
								<SummaryDataList pt="2" alignItems="start" media={media} />
							</DataListRoot>
							<Separator />
							{description && (
								<DialogDescription asChild>
									<Prose>{description}</Prose>
								</DialogDescription>
							)}
						</Flex>
						<Separator orientation="vertical" />
						<Flex direction="column" gap="3" alignItems="end">
							<Heading
								size="xl"
								alignSelf="center"
								textDecoration="underline"
								textDecorationColor="whiteAlpha.700"
							>
								Additional Info
							</Heading>
							<DataListRoot orientation="horizontal" variant="subtle" gap="2">
								<DetailDataList media={media} />
							</DataListRoot>
						</Flex>
					</Grid>
				</DialogBody>
				<DialogFooter>
					{media.type && (
						<ShareMediaButton
							type={lowercaseMediaType(media.type)}
							slug={media.id}
							shareTitle={title}
						/>
					)}
				</DialogFooter>
			</DialogContent>
		</DialogRoot>
	);
};
