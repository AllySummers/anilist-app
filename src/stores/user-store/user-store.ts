import { useContext } from 'react';
import { useStore } from 'zustand';
import type { UserStore } from './create-user-store';
import { UserStoreContext } from './user-store-context';

export function useUserStore<T>(selector: (store: UserStore) => T): T;
export function useUserStore(): UserStore;
export function useUserStore<T extends UserStore = UserStore>(
	selector: (store: UserStore) => T = (state) => state as T,
): T {
	const userStoreContext = useContext(UserStoreContext);

	if (!userStoreContext) {
		throw new Error(`useUserStore must be used within UserStoreProvider`);
	}

	return useStore(userStoreContext, selector);
}

export type { UserStore, UserStoreAPI, RequiredUserData, UserData } from './create-user-store';
