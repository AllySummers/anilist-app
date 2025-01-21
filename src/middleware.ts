import { type NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/actions/get-user';

const protectedRoutes = ['/profile', '/anime'];

export default async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

	const user = await getUser();

	if (user) {
		res.cookies.set('user-data', JSON.stringify(user), { httpOnly: true, path: '/' });
	}

	// Redirect to /register if the user is not authenticated
	if (isProtectedRoute && !user) {
		return NextResponse.redirect(new URL('/register', req.nextUrl));
	}

	// Redirect to /anime if the user is authenticated
	if (user && (path === '/' || path.startsWith('/register'))) {
		return NextResponse.redirect(new URL('/anime', req.nextUrl));
	}

	if (path === '/') {
		return NextResponse.redirect(new URL('/register', req.nextUrl));
	}

	return res;
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
