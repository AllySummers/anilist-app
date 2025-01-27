import type { ReactNode } from 'react';

export interface BrowseLayoutProps {
	children: ReactNode;
	modal: ReactNode;
}

export default function BrowseLayout({ children, modal }: BrowseLayoutProps) {
	return (
		<>
			{children}
			{modal}
		</>
	);
}
