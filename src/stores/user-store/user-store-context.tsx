'use client';

import { type ReactNode, createContext, useRef, useEffect } from 'react';
import { createUserStore, type UserData, type UserStoreAPI } from './create-user-store';

export const UserStoreContext = createContext<UserStoreAPI | undefined>(undefined);

export interface UserStoreProviderProps {
	children: ReactNode;
	value?: UserData;
}

export const UserStoreProvider = ({ children, value }: UserStoreProviderProps) => {
	const storeRef = useRef<UserStoreAPI>(undefined);
	storeRef.current ??= createUserStore({ ...value });

	useEffect(() => {
		storeRef.current?.setState({ ...value }, true);
	}, [value]);

	return (
		<UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>
	);
};
