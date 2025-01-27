import { useContext } from 'react';
import { useStore } from 'zustand';
import type { UserStore } from './create-user-store';
import { UserStoreContext } from './user-store-context';

export function useUser<T>(selector: (store: UserStore) => T): T;
export function useUser(): UserStore;
export function useUser<T extends UserStore = UserStore>(
	selector: (store: UserStore) => T = (state) => state as T,
): T {
	const userStoreContext = useContext(UserStoreContext);

	if (!userStoreContext) {
		throw new Error(`useUser must be used within UserStoreProvider`);
	}

	return useStore(userStoreContext, selector);
}

export type { UserStoreAPI, RequiredUserData, UserData } from './create-user-store';
