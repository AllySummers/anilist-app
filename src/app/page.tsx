import { Hero } from '@/components/ui/hero/hero';
import { siteInfo } from '@/config/site';

export default function HomePage() {
	return <Hero heading={`Welcome to ${siteInfo.title}!`} />;
}
