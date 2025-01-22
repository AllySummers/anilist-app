import { HStack, Stack } from '@chakra-ui/react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@/components/chakra-ui/skeleton';

export const AnimeCardSkeleton = () => (
	<Stack gap="6" maxW="xs">
		<Skeleton height="sm" />
		<HStack width="full">
			<SkeletonCircle size="10" />
			<SkeletonText noOfLines={2} />
		</HStack>
	</Stack>
);
