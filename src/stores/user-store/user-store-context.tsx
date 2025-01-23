'use client';

import { type ReactNode, createContext, useRef } from 'react';
import { createUserStore, type UserData, type UserStoreAPI } from './create-user-store';

export const UserStoreContext = createContext<UserStoreAPI | undefined>(undefined);

export interface UserStoreProviderProps {
	children: ReactNode;
	value?: UserData;
}

export const UserStoreProvider = ({ children, value }: UserStoreProviderProps) => {
	const storeRef = useRef<UserStoreAPI>(null);

	if (!storeRef.current) {
		console.log('Creating Store: ', value);
		storeRef.current = createUserStore({ ...value });
	} else {
		// if the value from the context has changed, the data from the server has changed
		// but we're using a nested else statement to avoid potential state updates
		// not being batched
		const currentState = storeRef.current.getState();
		if (
			value?.jobTitle !== currentState.jobTitle ||
			value?.username !== currentState.username
		) {
			console.log('Updating Context: ', {
				currentState,
				value,
			});
			storeRef.current.setState({ ...value }, true);
		}
	}

	return (
		<UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>
	);
};
