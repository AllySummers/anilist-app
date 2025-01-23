'use server';

import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';
import { cookieOptions } from '@/config/cookie-options';
import type { RequiredUserData } from '@/stores/user-store';
import { parseUserCookieJson } from '@/utils/parse-user-cookie-json';

export const getUserAction = async (): Promise<RequiredUserData | undefined> => {
	const cookie = await getCookie('user-data', { cookies, ...cookieOptions });

	return parseUserCookieJson(cookie);
};
