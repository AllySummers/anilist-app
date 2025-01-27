import { VStack, Heading } from '@chakra-ui/react';
import { ProfileForm } from '@/components/profile-form';
import { siteInfo } from '@/config/site';

export default function RegisterPage() {
	return (
		<VStack gap={12} px={{ base: '4', md: '0' }}>
			<Heading as="h1">{siteInfo.title} Registration</Heading>
			<ProfileForm
				legend="New User Registration Form"
				helperText="Please provide your desired username and your job title below to register for Anime Explorer."
			/>
		</VStack>
	);
}
