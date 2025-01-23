'use server';

import { deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const logoutUserAction = async (): Promise<void> => {
	await deleteCookie('user-data', { cookies });

	redirect('/register');
};
