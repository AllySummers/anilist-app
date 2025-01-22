'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { UserData } from '@/types/user-data';

export const UserContext = createContext<UserData | null>({});

export interface UserProviderProps {
	children: ReactNode;
	value: UserData | null;
}

export const UserProvider = ({ children, value }: UserProviderProps) => (
	<UserContext.Provider value={value}>{children}</UserContext.Provider>
);

export const useUser = () => {
	const context = useContext(UserContext);

	return context;
};
