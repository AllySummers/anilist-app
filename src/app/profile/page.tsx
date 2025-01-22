import { VStack, Heading } from '@chakra-ui/react';
import { getUser } from '@/actions/get-user';
import { ProfileForm } from '@/components/profile-form';
import { siteInfo } from '@/config/site';

export default async function ProfilePage() {
	const user = await getUser();

	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	return (
		<VStack gap={12}>
			<Heading as="h1">{user.username}&apos;s Profile</Heading>
			<ProfileForm
				legend={`${siteInfo.title} Profile Form`}
				helperText="Please update your profile information below."
				defaultValues={user}
			/>
		</VStack>
	);
}
