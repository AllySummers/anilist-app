import { VStack, Heading } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { getUserAction } from '@/actions/user/get-user';
import { ProfileForm } from '@/components/profile-form';
import { siteInfo } from '@/config/site';

export async function generateMetadata(): Promise<Metadata> {
	// i'm not sure if next caches the cookie action? but in higher volume apps it could be problematic depending how it does it.
	const user = await getUserAction();

	if (!user) {
		// middleware will redirect to /register if not authenticated, handled in the `ProfilePage` component
		return {
			title: 'Invalid Page',
		};
	}

	return {
		title: `${user.username}'s Profile`,
	};
}

export default async function ProfilePage() {
	const user = await getUserAction();

	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	return (
		<VStack gap={12}>
			<Heading as="h1">{user.username}&apos;s Profile</Heading>
			<ProfileForm
				legend={`${siteInfo.title.default} Profile Form`}
				helperText="Please update your profile information below."
				defaultValues={user}
			/>
		</VStack>
	);
}
