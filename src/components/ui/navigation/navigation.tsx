import { RequiredKeys } from '@/types/utility-types';
import { DesktopNavigation } from './desktop-navigation';
import { MobileNavigation } from './mobile-navigation';

export interface MenuItem {
	label: string;
	href: string;
}

export interface NavigationProps {
	items: MenuItem[];
	brand?: React.ReactNode;
}

export type NavigationViewpointProps = RequiredKeys<NavigationProps, 'brand'>;

// the `DesktopNavigation` and `MobileNavigation` components are set to only show if the breakpoint is above or below `md` respectively
export const Navigation = ({ items, brand = <></> }: NavigationProps) => (
	<>
		<DesktopNavigation items={items} brand={brand} />
		<MobileNavigation items={items} brand={brand} />
	</>
);
