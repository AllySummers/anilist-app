'use client';

import { HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import {
	PaginationItems,
	PaginationNextTrigger,
	PaginationPrevTrigger,
	PaginationRoot,
} from '@/components/chakra-ui/pagination';
import type { MediaType, PageInfo } from '@/gql/media-types';

export interface MediaPaginationProps {
	page?: PageInfo;
	mediaType: MediaType;
}

const getPageTotal = (page?: PageInfo) => {
	if (typeof page?.total === 'number' && typeof page?.perPage === 'number') {
		return page.total / page.perPage;
	}

	if (typeof page?.lastPage === 'number' && typeof page.perPage === 'number') {
		return page.lastPage * page.perPage;
	}

	if (
		page?.hasNextPage &&
		typeof page?.currentPage === 'number' &&
		typeof page.perPage === 'number'
	) {
		// if we don't know the total, but we know there is a next page,
		// we can assume the total is at least the current page * perPage
		return page.currentPage * page.perPage + 1;
	}

	return undefined;
};

export const MediaPagination = ({ page, mediaType }: MediaPaginationProps) => {
	const total = useMemo(() => getPageTotal(page), [page]);

	if (!page || typeof total !== 'number') {
		return null;
	}

	return (
		<PaginationRoot
			display="flex"
			justifyContent="center"
			count={total}
			page={page.currentPage}
			pageSize={page.perPage}
			defaultPage={1}
			getHref={(page) => `/browse/${mediaType}/${page}`}
		>
			<HStack>
				<PaginationPrevTrigger />
				<PaginationItems />
				<PaginationNextTrigger />
			</HStack>
		</PaginationRoot>
	);
};
