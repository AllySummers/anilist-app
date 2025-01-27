import type { Metadata } from 'next';
import { Logout } from '@/components/logout';
import { siteInfo } from '@/config/site';

export const metadata = {
	// it doesn't use the template when you statically set the title
	title: `Logging you out... | ${siteInfo.title.default}`,
} as Metadata;

export default function LogoutPage() {
	return <Logout />;
}
