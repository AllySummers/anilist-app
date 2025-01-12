'use client';

import { getCookie } from 'cookies-next/client';
import { useMemo } from 'react';
import { parseUserCookieJson } from '@/utils/parse-user-cookie-json';

export const useUserData = () => {
	const cookie = getCookie('user-data');

	const parsed = useMemo(() => parseUserCookieJson(cookie), [cookie]);

	return parsed;
};
