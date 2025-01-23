'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { useSettingsStore } from '@/stores/settings-store';

const HydrateStoresInternal = () => {
	const settingsStore = useSettingsStore((state) => state);

	useEffect(() => {
		if (!settingsStore) {
			void useSettingsStore.persist.rehydrate();
		}
		// disabling this so we don't get it to rehydrate multiple times.
		// it should only rehydrate once on initial client render
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return null;
};

// using dynamic to prevent issues with hydration mismatches
export const HydrateStores = dynamic(() => Promise.resolve(HydrateStoresInternal), { ssr: false });
