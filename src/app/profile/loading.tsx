import { Center, VStack, Spinner, Text } from '@chakra-ui/react';

export default function ProfileLoading() {
	return (
		<Center h="full">
			<VStack colorPalette="teal">
				<Spinner color="colorPalette.600" />
				<Text color="colorPalette.600">Loading Profile...</Text>
			</VStack>
		</Center>
	);
}
