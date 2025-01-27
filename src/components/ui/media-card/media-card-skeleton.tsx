'use client';
import { Card, Flex, Separator, Button } from '@chakra-ui/react';
import { DataListRoot, DataListItem } from '@/components/chakra-ui/data-list';
import { Skeleton, SkeletonText } from '@/components/chakra-ui/skeleton';

export const MediaCardSkeleton = () => (
	<Card.Root width="360px">
		<Card.Header>
			<Card.Title lineClamp="2">
				<SkeletonText noOfLines={1} />
			</Card.Title>
		</Card.Header>
		<Card.Body gap="3" pt="5" flexDirection="column">
			<Skeleton width="full" height="2xs" shadow="xl" marginBottom="2" />
			<Flex direction="column" flex="1" gap="0" justify="space-between">
				<DataListRoot orientation="horizontal" variant="subtle" gap="2">
					<DataListItem
						label={<SkeletonText noOfLines={1} />}
						value={<SkeletonText noOfLines={1} />}
					/>
					<DataListItem
						label={<SkeletonText noOfLines={1} />}
						value={<SkeletonText noOfLines={1} />}
					/>
					<DataListItem
						label={<SkeletonText noOfLines={1} />}
						value={<SkeletonText noOfLines={1} />}
					/>
					<DataListItem
						label={<SkeletonText noOfLines={1} />}
						value={<SkeletonText noOfLines={1} />}
					/>
					<DataListItem
						label={<SkeletonText noOfLines={1} />}
						value={<SkeletonText noOfLines={1} />}
					/>
				</DataListRoot>
			</Flex>
			<Flex direction="column" flex="1" gap="inherit" justify="end">
				<Separator />
				<Card.Description lineClamp="3" asChild>
					<SkeletonText noOfLines={3} />
				</Card.Description>
			</Flex>
		</Card.Body>
		<Card.Footer justifyContent="flex-end">
			<Button variant="outline" disabled pointerEvents="none">
				<SkeletonText noOfLines={1} />
			</Button>
		</Card.Footer>
	</Card.Root>
);
