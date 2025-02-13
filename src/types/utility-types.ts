export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

type AsyncPageProps = 'params' | 'searchParams';

export type NextPageProps<T> = {
	[K in keyof T]: K extends AsyncPageProps ? Promise<T[K]> : T[K];
};
