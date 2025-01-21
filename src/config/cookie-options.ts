import type { SerializeOptions } from 'cookie';

export const cookieOptions: SerializeOptions = {
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'lax',
	maxAge: 60 * 60 * 24 * 7, // 1 week
};
