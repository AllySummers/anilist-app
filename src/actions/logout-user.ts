'use server';

import { deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logoutUser = async (): Promise<void> => {
	await deleteCookie('user-data', { cookies });

	redirect('/register');
};
