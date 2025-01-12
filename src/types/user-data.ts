export interface UserData {
	username?: string;
	jobTitle?: string;
}

export type RequiredUserData = Required<UserData>;
