'use client';
import { Card, Center, Flex, Spinner, VStack, Text, ClientOnly } from '@chakra-ui/react';
import { DataListItem, DataListRoot } from '@/components/chakra-ui/data-list';
import { SkeletonText, Skeleton } from '@/components/chakra-ui/skeleton';

export default function MediaItemLoading() {
	return (
		<ClientOnly>
			<Card.Root
				size="lg"
				maxWidth={{ base: 'full', lg: 'breakpoint-2xl' }}
				alignSelf="center"
			>
				<Card.Header
					display="flex"
					justifyContent="space-between"
					alignItems="start"
					flexDirection="row"
				>
					<Card.Title lineClamp="2">Loading...</Card.Title>
				</Card.Header>
				<Card.Body minHeight="40" gap="3" pt="5" flexDirection="column" display="flex">
					<Center h="full">
						<VStack colorPalette="teal">
							<Spinner color="colorPalette.600" />
							<Text color="colorPalette.600">Fetching Details...</Text>
						</VStack>
					</Center>
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
					<SkeletonText noOfLines={5} />
				</Card.Body>
			</Card.Root>
		</ClientOnly>
	);
}
