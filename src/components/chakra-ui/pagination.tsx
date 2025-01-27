'use client';

import type { ButtonProps, TextProps } from '@chakra-ui/react';
import {
	Button,
	Pagination as ChakraPagination,
	IconButton,
	Text,
	createContext,
	usePaginationContext,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, Ellipsis } from 'lucide-react';
import type { Route } from 'next';
import {
	forwardRef,
	type HTMLAttributes,
	type JSX,
	type Ref,
	type RefAttributes,
	useMemo,
} from 'react';
import { LinkButton } from './link-button';

type GetHref<RouteType extends string> = (page: number) => Route<RouteType> | URL;

interface ButtonVariantMap {
	current: ButtonProps['variant'];
	default: ButtonProps['variant'];
	ellipsis: ButtonProps['variant'];
}

type PaginationVariant = 'outline' | 'solid' | 'subtle';

interface ButtonVariantContext<RouteType extends string> {
	size: ButtonProps['size'];
	variantMap: ButtonVariantMap;
	getHref?: GetHref<RouteType>;
}

const [RootPropsProvider, useRootProps] = createContext<ButtonVariantContext<Route<string>>>({
	name: 'RootPropsProvider',
});

export interface PaginationRootProps<RouteType extends string>
	extends Omit<ChakraPagination.RootProps, 'type'> {
	size?: ButtonProps['size'];
	variant?: PaginationVariant;
	getHref?: GetHref<RouteType>;
}

const variantMap: Record<PaginationVariant, ButtonVariantMap> = {
	outline: { default: 'ghost', ellipsis: 'plain', current: 'outline' },
	solid: { default: 'outline', ellipsis: 'outline', current: 'solid' },
	subtle: { default: 'ghost', ellipsis: 'plain', current: 'subtle' },
};

export const PaginationRoot = forwardRef(function PaginationRoot<RouteType extends string>(
	props: PaginationRootProps<RouteType>,
	ref: Ref<HTMLDivElement>,
) {
	const { size = 'sm', variant = 'outline', getHref, ...rest } = props;
	return (
		// @ts-expect-error -- this happens because (as far as i know?) you can't
		// add a generic to a component created with chakra's `createContext`?
		<RootPropsProvider value={{ size, variantMap: variantMap[variant], getHref }}>
			<ChakraPagination.Root ref={ref} type={getHref ? 'link' : 'button'} {...rest} />
		</RootPropsProvider>
	);
	// type casting here otherwise anything that tries to use it will have type errors on some urls
}) as <RouteType extends string>(
	props: PaginationRootProps<RouteType> & RefAttributes<HTMLDivElement>,
) => JSX.Element;

export const PaginationEllipsis = forwardRef<HTMLDivElement, ChakraPagination.EllipsisProps>(
	function PaginationEllipsis(props, ref) {
		const { size, variantMap } = useRootProps();
		return (
			<ChakraPagination.Ellipsis ref={ref} {...props} asChild>
				<Button as="span" variant={variantMap.ellipsis} size={size}>
					<Ellipsis />
				</Button>
			</ChakraPagination.Ellipsis>
		);
	},
);

export const PaginationItem = forwardRef<HTMLButtonElement, ChakraPagination.ItemProps>(
	function PaginationItem(props, ref) {
		const { page } = usePaginationContext();
		const { size, variantMap, getHref } = useRootProps();

		const current = page === props.value;
		const variant = current ? variantMap.current : variantMap.default;

		if (getHref) {
			const href = getHref(props.value);

			if (href) {
				return (
					<LinkButton href={getHref(props.value)} variant={variant} size={size}>
						{props.value}
					</LinkButton>
				);
			}

			return (
				<Button variant={variantMap.default} size={size} disabled>
					<ChevronLeft />
				</Button>
			);
		}

		return (
			<ChakraPagination.Item ref={ref} {...props} asChild>
				<Button variant={variant} size={size}>
					{props.value}
				</Button>
			</ChakraPagination.Item>
		);
	},
);

export const PaginationPrevTrigger = forwardRef<
	HTMLButtonElement,
	ChakraPagination.PrevTriggerProps
>(function PaginationPrevTrigger(props, ref) {
	const { size, variantMap, getHref } = useRootProps();
	const { previousPage } = usePaginationContext();

	if (getHref) {
		const href = previousPage != null ? getHref(previousPage) : undefined;
		if (href) {
			return (
				<LinkButton href={href} variant={variantMap.default} size={size}>
					<ChevronLeft />
				</LinkButton>
			);
		}

		return (
			<Button variant={variantMap.default} size={size} disabled>
				<ChevronLeft />
			</Button>
		);
	}

	return (
		<ChakraPagination.PrevTrigger ref={ref} asChild {...props}>
			<IconButton variant={variantMap.default} size={size}>
				<ChevronLeft />
			</IconButton>
		</ChakraPagination.PrevTrigger>
	);
});

export const PaginationNextTrigger = forwardRef<
	HTMLButtonElement,
	ChakraPagination.NextTriggerProps
>(function PaginationNextTrigger(props, ref) {
	const { size, variantMap, getHref } = useRootProps();
	const { nextPage } = usePaginationContext();

	if (getHref) {
		const href = nextPage != null ? getHref(nextPage) : undefined;

		if (href) {
			return (
				<LinkButton href={href} variant={variantMap.default} size={size}>
					<ChevronRight />
				</LinkButton>
			);
		}

		return (
			<Button variant={variantMap.default} size={size} disabled>
				<ChevronRight />
			</Button>
		);
	}

	return (
		<ChakraPagination.NextTrigger ref={ref} asChild {...props}>
			<IconButton variant={variantMap.default} size={size}>
				<ChevronRight />
			</IconButton>
		</ChakraPagination.NextTrigger>
	);
});

export const PaginationItems = (props: HTMLAttributes<HTMLElement>) => {
	return (
		<ChakraPagination.Context>
			{({ pages }) =>
				pages.map((page, index) => {
					return page.type === 'ellipsis' ? (
						<PaginationEllipsis key={index} index={index} {...props} />
					) : (
						<PaginationItem key={index} type="page" value={page.value} {...props} />
					);
				})
			}
		</ChakraPagination.Context>
	);
};

interface PageTextProps extends TextProps {
	format?: 'short' | 'compact' | 'long';
}

export const PaginationPageText = forwardRef<HTMLParagraphElement, PageTextProps>(
	function PaginationPageText(props, ref) {
		const { format = 'compact', ...rest } = props;
		const { page, totalPages, pageRange, count } = usePaginationContext();
		const content = useMemo(() => {
			if (format === 'short') return `${page} / ${totalPages}`;
			if (format === 'compact') return `${page} of ${totalPages}`;
			return `${pageRange.start + 1} - ${Math.min(pageRange.end, count)} of ${count}`;
		}, [format, page, totalPages, pageRange, count]);

		return (
			<Text fontWeight="medium" ref={ref} {...rest}>
				{content}
			</Text>
		);
	},
);
