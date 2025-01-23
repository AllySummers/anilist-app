'use client';

import { IconButton, Separator } from '@chakra-ui/react';
import Link from 'next/link';
import { Avatar } from '@/components/chakra-ui/avatar';
import {
	MenuContent,
	MenuItem,
	MenuItemGroup,
	MenuRoot,
	MenuTrigger,
} from '@/components/chakra-ui/menu';
import { useUserStore } from '@/stores/user-store';

export const ProfileMenu = () => {
	const userData = useUserStore();

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
					<Avatar name={userData?.username} />
				</IconButton>
			</MenuTrigger>
			<MenuContent>
				{userData ? (
					<>
						<MenuItemGroup title={`${userData.username}'s Account`}>
							<MenuItem value="profile-button" asChild>
								<Link href="/profile">Profile</Link>
							</MenuItem>
							<Separator />
							<MenuItem value="logout-button" asChild>
								<Link href="/logout">Logout</Link>
							</MenuItem>
						</MenuItemGroup>
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
