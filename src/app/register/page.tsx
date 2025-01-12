import { VStack, Heading } from '@chakra-ui/react';
import { ProfileForm } from '@/components/profile-form';

export default function RegisterPage() {
	return (
		<VStack gap={12}>
			<Heading as="h1">Anime Explorer Registration</Heading>
			<ProfileForm
				legend="New User Registration Form"
				helperText="Please provide your desired username and your job title below to register for Anime Explorer."
			/>
		</VStack>
	);
}
