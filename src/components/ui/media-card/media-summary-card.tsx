'use client';
import { Card, Flex, Separator } from '@chakra-ui/react';
import Link from 'next/link';
import { Button } from '@/components/chakra-ui/button';
import { DataListRoot } from '@/components/chakra-ui/data-list';
import { Prose } from '@/components/chakra-ui/prose';
import { Tooltip } from '@/components/chakra-ui/tooltip';
import type { MediaSummary } from '@/gql/media-types';
import { lowercaseMediaType } from '@/graphql/data-transformers/common-data';
import { SummaryDataList } from '../media/summary-data-list';
import { MediaAdult } from '../media-adult';
import { ShareMediaButton } from '../media-link';
import { MediaScore } from '../media-score';
import { MediaCardImage } from './media-card-image';

export interface MediaSummaryCardProps {
	media: MediaSummary;
	title: string;
	imgSrc?: string;
}

export const MediaSummaryCard = ({
	media: { meanScore = 0, isAdult = false, id, description, type, ...media },
	title,
	imgSrc,
}: MediaSummaryCardProps) => (
	<Card.Root width="360px">
		<Card.Header justifyContent="space-between" alignItems="start" flexDirection="row">
			{/*	Tooltip is used to show the full title when it's truncated */}
			<Tooltip content={title}>
				<Card.Title lineClamp="2" minHeight="2lh">
					{title}
				</Card.Title>
			</Tooltip>
			<Flex direction="column" justifyContent="space-between" gap="1" align="end">
				{isAdult && <MediaAdult />}
				{meanScore >= 50 && <MediaScore score={meanScore} steps={[50, 70, 90]} />}
			</Flex>
		</Card.Header>
		<Card.Body gap="3" pt="5" flexDirection="column">
			<MediaCardImage src={imgSrc} isAdult={isAdult} alt={title} />
			<DataListRoot orientation="horizontal" variant="subtle" gap="2" alignContent="start">
				{/*	only load the first 3 genres/studios, since they can go the detail component to see the rest */}
				<SummaryDataList alignItems="start" media={media} maxGenres={3} maxStudios={3} />
			</DataListRoot>

			<Flex direction="column" flex="1" gap="inherit" justify="end">
				<Separator />
				{description && (
					<Card.Description lineClamp="3" asChild>
						<Prose>{description}</Prose>
					</Card.Description>
				)}
			</Flex>
		</Card.Body>
		<Card.Footer justifyContent="space-between">
			{type && (
				<>
					<ShareMediaButton
						type={lowercaseMediaType(type)}
						slug={id}
						shareTitle={title}
					/>
					<Button variant="solid" asChild>
						<Link href={`/view/${lowercaseMediaType(type)}/${id}`}>View Details</Link>
					</Button>
				</>
			)}
		</Card.Footer>
	</Card.Root>
);
