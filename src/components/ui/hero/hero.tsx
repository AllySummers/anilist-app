import { Stack, Separator, Heading, Flex } from '@chakra-ui/react';
import { HeroSide } from './hero-side';

export interface HeroProps {
	heading: string;
}

export const Hero = ({ heading }: HeroProps) => (
	<Flex
		w="vw"
		h="5xl"
		position="relative"
		p="0"
		direction="column"
		align="center"
		justify="center"
	>
		<Heading
			// not sure how to disable highlighting the underline :(
			textDecoration="underline"
			textUnderlineOffset="1rem"
			textDecorationColor="fg"
			position="absolute"
			w="full"
			display="block"
			top="20"
			lineHeight="tall"
			zIndex={10}
			textAlign="center"
			right={0}
			as="h1"
			size={{ base: '2xl', sm: '3xl' }}
		>
			{heading}
		</Heading>

		<Stack w="vw" h="5xl" position="relative" direction={{ base: 'column', md: 'row' }} gap="0">
			<HeroSide
				linkHref="/browse/anime"
				linkText="View Anime"
				imageSrc="https://images.unsplash.com/photo-1578632767115-351597cf2477"
			/>
			<Separator
				size="lg"
				borderColor="blackAlpha.600"
				variant="solid"
				orientation={{ base: 'horizontal', md: 'vertical' }}
			/>
			<HeroSide
				linkHref="/browse/manga"
				linkText="View Manga"
				imageSrc="https://images.unsplash.com/photo-1613376023733-0a73315d9b06"
			/>
		</Stack>
	</Flex>
);
