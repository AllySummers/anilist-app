import { Card, Flex, Grid, Heading, Separator } from '@chakra-ui/react';
import { useMemo } from 'react';
import { DataListRoot } from '@/components/chakra-ui/data-list';
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

export interface MediaDetailsProps {
	media: MediaDetail;
}

export const MediaDetails = ({
	media: {
		bannerImage,
		description,
		id,
		type,
		isAdult = false,
		meanScore = 0,
		title: mediaTitle,
		...media
	},
}: MediaDetailsProps) => {
	const title = useMemo(() => getTitle(mediaTitle), [mediaTitle]);

	return (
		<Card.Root mx="8" mb="8">
			<Card.Header>
				<Flex justify="space-between" align="start">
					<Tooltip content={title}>
						<Card.Title lineClamp="2">{title}</Card.Title>
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
				</Flex>
			</Card.Header>
			<Card.Body gap="3" pt="5" flexDirection="column" display="flex">
				<MediaCardBannerImage src={bannerImage} isAdult={isAdult} alt={title} />
				<Grid templateColumns="2fr min-content 1fr" gap="inherit">
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
							<Card.Description asChild>
								<Prose>{description}</Prose>
							</Card.Description>
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
			</Card.Body>
			<Card.Footer>
				{type && (
					<ShareMediaButton
						type={lowercaseMediaType(type)}
						slug={id}
						shareTitle={title}
					/>
				)}
			</Card.Footer>
		</Card.Root>
	);
};
