import type { UserData } from '@/types/user-data';

export interface UserDataValid {
	valid: true;
	values: UserData;
	errors?: undefined;
	message?: string;
}

export interface UserDataInvalid {
	valid: false;
	values: Partial<UserData>;
	errors?: Partial<Record<keyof UserData, string>>;
	message?: string;
}

export type ParsedUserData = UserDataValid | UserDataInvalid;

function assertIsString(value: unknown): asserts value is string {
	if (typeof value !== 'string') {
		throw new Error('Value must be a string.');
	}
}

export const parseUserData = (form: FormData): ParsedUserData => {
	const errors: UserDataInvalid['errors'] = {};

	const username = form.get('username');
	const jobTitle = form.get('jobTitle');

	if (!username) {
		errors.username = 'Username is a required field.';
	} else if (typeof username !== 'string') {
		errors.username = 'Username must be a string.';
	} else {
		errors.username = undefined;
	}

	if (!jobTitle) {
		errors.jobTitle = 'Job title is a required field.';
	} else if (typeof jobTitle !== 'string') {
		errors.jobTitle = 'Job title must be a string.';
	} else {
		errors.jobTitle = undefined;
	}

	if (errors.username || errors.jobTitle) {
		return {
			valid: false,
			values: {
				...(typeof username === 'string' ? { username } : {}),
				...(typeof jobTitle === 'string' ? { jobTitle } : {}),
			},
			errors,
			message: 'Please correct the errors in the form.',
		};
	}

	// if either of these are not a string, it will mean that `errors.username` or `errors.jobTitle` will be set
	assertIsString(username);
	assertIsString(jobTitle);

	return {
		values: {
			username: username,
			jobTitle: jobTitle,
		},
		valid: true,
	};
};
