import { createStore, type StoreApi } from 'zustand';

export interface UserData {
	username?: string;
	jobTitle?: string;
}

export type RequiredUserData = Required<UserData>;

export type UserStore = UserData | RequiredUserData;

export interface UserActions {
	loginUser: (data: UserData) => void;
	logoutUser: () => void;
}

export type UserStoreAPI = StoreApi<UserStore>;

export const initUserState: UserStore = {};

export const createUserStore = (initState: UserStore = initUserState) =>
	createStore<UserStore>()(() => ({
		...initState,
	}));
