import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

export interface SettingsStore {
	_hasHydrated: boolean;
	showAdultContent: boolean;
	showGeneralSpoilerTags: boolean;
	showMediaSpoilerTags: boolean;
}

const initialStore: SettingsStore = {
	_hasHydrated: false,
	showAdultContent: false,
	showGeneralSpoilerTags: false,
	showMediaSpoilerTags: false,
};

export const useSettingsStore = create<SettingsStore>()(
	devtools(
		persist(() => initialStore, {
			name: 'settings-store',
			skipHydration: true,
			storage: createJSONStorage(() => localStorage),
			onRehydrateStorage: () => () => useSettingsStore.setState({ _hasHydrated: true }),
			partialize: (state) => ({
				showAdultContent: state.showAdultContent,
				showGeneralSpoilerTags: state.showGeneralSpoilerTags,
				showMediaSpoilerTags: state.showMediaSpoilerTags,
			}),
		}),
		{
			name: 'settings-store',
			enabled: true,
		},
	),
);
