import type { MenuItem } from '@/components/ui/navigation/navigation';

const navItems = <T extends string>(items: MenuItem<T>[]) => items;

// export const navigationItems =  as const satisfies MenuItem[];

export const navigationItems = navItems([
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Anime',
		href: '/browse/anime/1',
	},
	{
		label: 'Manga',
		href: '/browse/manga',
	},
]);
