import { Button, Flex } from '@chakra-ui/react';
import Link from 'next/link';

export interface HeroSideProps {
	imageSrc: string;
	linkText: string;
	linkHref: string;
}

export const HeroSide = ({ imageSrc, linkHref, linkText }: HeroSideProps) => (
	<Flex
		w="full"
		h="full"
		justifyContent="center"
		alignItems="center"
		transitionDuration="moderate"
		transitionProperty="all"
		transitionTimingFunction="ease"
		position="relative"
		_before={{
			backgroundImage: `url(${imageSrc})`,
			backgroundSize: 'cover',
			backgroundPosition: 'center',
			content: '" "',
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 0,
			width: 'full',
			height: 'full',
			opacity: 0.5,
			transitionDuration: 'moderate',
			transitionProperty: 'all',
			transitionTimingFunction: 'ease',
		}}
		_hover={{
			_before: {
				opacity: 0.7,
			},
		}}
	>
		<Button
			variant="outline"
			size="2xl"
			colorPalette="white"
			borderStyle="solid"
			borderColor="white"
			borderWidth="2px"
			letterSpacing="widest"
			fontSize="x-large"
			background="blackAlpha.500"
			backdropFilter="blur(5px)"
			transitionDuration="moderate"
			transitionProperty="all"
			transitionTimingFunction="ease"
			_hover={{
				transform: 'scale(1.05)',
			}}
			asChild
		>
			<Link href={linkHref}>{linkText}</Link>
		</Button>
	</Flex>
);
