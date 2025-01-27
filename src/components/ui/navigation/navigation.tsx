import type { Route } from 'next';
import { RequiredKeys } from '@/types/utility-types';
import { DesktopNavigation } from './desktop-navigation';
import { MobileNavigation } from './mobile-navigation';

export interface MenuItem<T extends string> {
	label: string;
	href: Route<T>;
}

export interface NavigationProps<T extends string> {
	items: MenuItem<T>[];
	brand?: React.ReactNode;
}

export type NavigationViewpointProps<T extends string> = RequiredKeys<NavigationProps<T>, 'brand'>;

// the `DesktopNavigation` and `MobileNavigation` components are set to only show if the breakpoint is above or below `md` respectively
export const Navigation = <T extends string>({ items, brand = <></> }: NavigationProps<T>) => (
	<>
		<DesktopNavigation items={items} brand={brand} />
		<MobileNavigation items={items} brand={brand} />
	</>
);
