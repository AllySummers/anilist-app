import { Center, VStack, Spinner, Text } from '@chakra-ui/react';

export default function LogoutLoading() {
	return (
		<Center h="full">
			<VStack colorPalette="teal">
				<Spinner color="colorPalette.600" />
				<Text color="colorPalette.600">Logging you out...</Text>
			</VStack>
		</Center>
	);
}
