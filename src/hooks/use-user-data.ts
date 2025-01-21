'use client';

import { useGetCookie } from 'cookies-next/client';
import { cookieOptions } from '@/config/cookie-options';
import { parseUserCookieJson } from '@/utils/parse-user-cookie-json';

export const useUserData = () => {
	const getCookie = useGetCookie();
	const cookie = getCookie('user-data', cookieOptions);
	const parsed = parseUserCookieJson(cookie);

	return parsed;
};
