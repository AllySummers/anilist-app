import type { ReactNode } from 'react';

export interface BrowseModalSlotProps {
	children: ReactNode;
}

export default function BrowseModalSlot({ children }: BrowseModalSlotProps) {
	return <>{children}</>;
}
