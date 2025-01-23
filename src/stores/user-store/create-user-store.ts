import { createStore, StoreApi } from 'zustand/vanilla';

export interface UserData {
	username?: string;
	jobTitle?: string;
}

export type RequiredUserData = Required<UserData>;

export type UserState = UserData | RequiredUserData;

export interface UserActions {
	setUser: (data: UserState) => void;
}

export type UserStore = UserState & UserActions;

export type UserStoreAPI = StoreApi<UserStore>;

export const initUserState: UserState = {};

export const createUserStore = (initState: UserState = initUserState) =>
	createStore<UserStore>()((set) => ({
		...initState,
		setUser: (data) => set(data),
	}));
