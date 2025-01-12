'use server';

import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
import { UserData } from '@/types/user-data';
import { parseUserCookieJson } from '@/utils/parse-user-cookie-json';

export const getUser = async (): Promise<Required<UserData> | null> => {
	const cookie = await getCookie('user-data', { cookies });

	return parseUserCookieJson(cookie);
};
