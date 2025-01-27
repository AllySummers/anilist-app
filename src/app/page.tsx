import type { Metadata } from 'next';
import { Hero } from '@/components/ui/hero/hero';
import { siteInfo } from '@/config/site';

export const metadata = {
	// it doesn't use the template when you statically set the title
	title: `Home | ${siteInfo.title.default}`,
} satisfies Metadata;

export default function HomePage() {
	return <Hero heading={`Welcome to ${siteInfo.title.default}!`} />;
}
