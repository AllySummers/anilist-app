import type { RequiredUserData } from '@/types/user-data';

export const parseUserCookieJson = (cookie?: string | null): RequiredUserData | null => {
	if (!cookie) return null;

	try {
		// JSON.parse always returns `any` and we check it after this so this can be ignored
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const parsed: { username: string; jobTitle: string } = JSON.parse(cookie);
		if (typeof parsed === 'object' && parsed && 'username' in parsed && 'jobTitle' in parsed) {
			return {
				username: parsed.username,
				jobTitle: parsed.jobTitle,
			};
		}
	} catch {
		// if the cookie is invalid or missing, we can just return null so the user can log in again
	}

	return null;
};
