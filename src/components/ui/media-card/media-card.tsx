import { Box, Image, Text, VStack, Badge, HStack, Tooltip } from '@chakra-ui/react';

export interface AnimeCardProps {
	title: {
		english: string;
		native: string;
		description: string;
	};
	isAdult: boolean;
	bannerImage: string;
	duration: number;
	genres: string[];
	cardBgColor: string; // Background color for the card
	tooltipBgColor: string; // Background color for the tooltip
}

export const AnimeCard = ({
	title,
	isAdult,
	bannerImage,
	duration,
	genres,
	cardBgColor,
	tooltipBgColor,
}: AnimeCardProps) => {
	return (
		<Box
			position="relative"
			w="200px"
			borderRadius="md"
			overflow="hidden"
			bg={cardBgColor}
			shadow="lg"
			_hover={{ transform: 'scale(1.02)' }}
			transition="all 0.3s ease"
		>
			{/* Image */}
			<Image
				src={bannerImage}
				alt={`${title.english} Banner`}
				w="full"
				h="280px"
				objectFit="cover"
			/>

			{/* Title */}
			<Box p={2}>
				<Text fontSize="md" fontWeight="bold">
					{title.english || 'Unknown Title'}
				</Text>
				<Text fontSize="sm" color="gray.500">
					{title.native || ''}
				</Text>
			</Box>

			{/* Tooltip on Hover */}
			<Tooltip
				label={
					<VStack
						align="start"
						gap={1}
						bg={tooltipBgColor}
						p={3}
						borderRadius="md"
						shadow="md"
					>
						<Text fontSize="sm" fontWeight="bold">
							{title.english || 'Unknown Title'}
						</Text>
						<Text fontSize="xs" color="gray.500" noOfLines={2}>
							{title.description || 'No Description Available'}
						</Text>
						<HStack gap={2}>
							{genres.map((genre, index) => (
								<Badge key={index} colorScheme="purple" fontSize="xs">
									{genre}
								</Badge>
							))}
						</HStack>
						<Text fontSize="xs" color="gray.600">
							{duration ? `${duration} mins` : 'Unknown Duration'}
						</Text>
						{isAdult && (
							<Badge colorScheme="red" fontSize="xs">
								18+
							</Badge>
						)}
					</VStack>
				}
				hasArrow
			>
				<Box position="absolute" top={2} right={2}>
					<Badge colorScheme="yellow" fontSize="xs">
						Details
					</Badge>
				</Box>
			</Tooltip>
		</Box>
	);
};
