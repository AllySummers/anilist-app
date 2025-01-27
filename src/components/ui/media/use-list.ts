import { useId, useMemo, useCallback, type Key } from 'react';

interface ListBaseProps {
	max?: number;
}

export type ListProps<T> = ListBaseProps &
	(T extends string | number
		? { getKey?: (item: T, index: number) => Key }
		: { getKey: (item: T, index: number) => Key });

export const useList = <T>(
	items: T[] | undefined,
	{ max = Number.POSITIVE_INFINITY, getKey = (_, index) => index }: ListProps<T>,
) => {
	// while this is usually for accessibility, there's a small chance that 2 media
	// elements could have the same id and the same genre (i.e. if it's open in a
	// modal and it's open behind the modal too). so we just use a base id to prefix
	// the keys in this list
	const listId = useId();
	const selectedItems = useMemo(() => items?.slice(0, max), [items, max]);
	const keyFn = useCallback(
		(item: T, itemIndex: number) => `${listId}-${itemIndex}-${getKey(item, itemIndex)}`,
		[getKey, listId],
	);

	return {
		items: selectedItems,
		keyFn,
		totalLength: items?.length ?? 0,
		shownLength: selectedItems?.length ?? 0,
	};
};
