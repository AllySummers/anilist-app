'use client';

import { type ReactNode, createContext, useRef } from 'react';
import { createUserStore, type UserState, type UserStoreAPI } from './create-user-store';

export const UserStoreContext = createContext<UserStoreAPI | undefined>(undefined);

export interface UserStoreProviderProps {
	children: ReactNode;
	value?: UserState;
}

export const UserStoreProvider = ({ children, value }: UserStoreProviderProps) => {
	const storeRef = useRef<UserStoreAPI>(null);
	if (!storeRef.current) {
		storeRef.current = createUserStore(value);
	}

	return (
		<UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>
	);
};
