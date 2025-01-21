'use client';
import { IconButton } from '@chakra-ui/react';
import { User } from 'lucide-react';
import Link from 'next/link';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/chakra-ui/menu';
import { useUserData } from '@/hooks/use-user-data';

export const ProfileMenu = () => {
	const userData = useUserData();

	console.log(userData);

	return (
		<MenuRoot>
			<MenuTrigger asChild>
				<IconButton
					asChild
					variant="ghost"
					size="sm"
					aria-label="Profile menu"
					rounded="full"
				>
					{/* if users had a profile picture, we should
					change this to an iamge component if it is
					 exists, but using a static icon for now. */}
					<User />
				</IconButton>
			</MenuTrigger>
			<MenuContent>
				{userData ? (
					<>
						<MenuItem value="profile-button" asChild>
							<Link href="/profile">Profile</Link>
						</MenuItem>

						<MenuItem value="logout-button" asChild>
							<Link href="/logout">Logout</Link>
						</MenuItem>
					</>
				) : (
					<MenuItem value="login-button" asChild>
						<Link href="/register">Login</Link>
					</MenuItem>
				)}
			</MenuContent>
		</MenuRoot>
	);
};
