export const isEmpty = <T>(value: T): value is Exclude<T, null | undefined> =>
	value === undefined ||
	value === null ||
	(Array.isArray(value) && value.length === 0) ||
	(typeof value === 'object' && Object.values(value).length === 0);

export const nonNullableArray = <T>(array: readonly T[]): Array<Exclude<T, null | undefined>> =>
	array.filter((item): item is Exclude<T, null | undefined> => !isEmpty(item));

/**
 * Creates a new object with the same keys as the original object,
 * but with the values that are not of the type E.
 * Must
 */
export type NonNullableObject<T, K extends keyof T> = {
	[P in K]: NonNullable<T[P]>;
};

/**
 * Creates a new object with a subset of the keys from the original object,
 * but with the values that are not of the type E.
 */
export const nonNullableKeys = <T, K extends keyof T>(
	object: T,
	...keys: readonly K[]
): NonNullableObject<T, K> => {
	// need to type cast typescript doesn't know that the object will be filled with the keys
	const result: NonNullableObject<T, K> = {} as NonNullableObject<T, K>;
	for (const key of keys) {
		const value = object[key];
		if (value != null && !isEmpty(value)) {
			result[key] = value;
		}
	}

	if ('trending' in result && result.trending !== 0) {
		console.log('trending', result.trending, { result, object, keys });
	}
	return result;
};
