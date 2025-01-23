import { Box, VStack, HStack } from '@chakra-ui/react';
import { SkeletonText, Skeleton } from '@/components/chakra-ui/skeleton';

export const AnimeCardSkeleton = () => (
	<Box
		borderWidth="1px"
		borderRadius="lg"
		overflow="hidden"
		bg="fg"
		shadow="md"
		w="full"
		maxW="400px"
	>
		{/* Skeleton Banner */}
		<Skeleton h="200px" w="full" />

		{/* Skeleton Content */}
		<VStack align="start" gap={4} p={4}>
			{/* Title and Badge */}
			<HStack justify="space-between" w="full">
				<Skeleton h="20px" w="70%" />
				<Skeleton h="20px" w="15%" />
			</HStack>

			{/* Native Title */}
			<Skeleton h="16px" w="50%" />

			{/* Description */}
			<SkeletonText noOfLines={3} gap={2} />

			{/* Duration */}
			<Skeleton h="16px" w="40%" />

			{/* Genres */}
			<HStack wrap="wrap" gap={2}>
				<Skeleton h="24px" w="60px" borderRadius="md" />
				<Skeleton h="24px" w="60px" borderRadius="md" />
				<Skeleton h="24px" w="60px" borderRadius="md" />
			</HStack>
		</VStack>
	</Box>
);
