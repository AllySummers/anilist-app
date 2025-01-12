import { Spinner, VStack, Text } from '@chakra-ui/react';

export default function HomePage() {
	return (
		<VStack>
			<Spinner />
			<Text>Loading Anime Browser</Text>
		</VStack>
	);
}
