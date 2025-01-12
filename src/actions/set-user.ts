'use server';

import { setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseUserData, type ParsedUserData } from '@/utils/parse-user-data';

export const setUser = async (
	_prevState: ParsedUserData,
	data: FormData,
): Promise<ParsedUserData> => {
	const userData = parseUserData(data);
	if (!userData.valid) {
		return userData;
	}

	await setCookie('user-data', JSON.stringify(userData.values), {
		cookies,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
	});

	redirect('/anime');
};
