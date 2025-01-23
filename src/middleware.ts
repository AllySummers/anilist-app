import { type NextRequest, NextResponse } from 'next/server';
import { getUserAction } from '@/actions/get-user';

// using unprotected routes instead of protected routes because
// `/` is a protected route, and everything starts with `/`, and
// the logic is less complicated this way
const unprotectedRoutes = [
	'/register',
	// should logout be an unprotected route?
	'/logout',
];

export default async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const path = req.nextUrl.pathname;
	const isProtectedRoute = !unprotectedRoutes.some((route) => path.startsWith(route));

	const user = await getUserAction();

	if (user) {
		res.cookies.set('user-data', JSON.stringify(user), { httpOnly: true, path: '/' });
	}

	// Redirect to /register if the user is not authenticated
	if (isProtectedRoute && !user) {
		return NextResponse.redirect(new URL('/register', req.nextUrl));
	}

	// Redirect to / if the user is authenticated and tries to access /register
	if (user && path.startsWith('/register')) {
		return NextResponse.redirect(new URL('/', req.nextUrl));
	}

	return res;
}

// Routes Middleware should not run on
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
