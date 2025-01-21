'use client';

import type { IconButtonProps } from '@chakra-ui/react';
import { ClientOnly, IconButton, Skeleton } from '@chakra-ui/react';
import { Sun, Moon } from 'lucide-react';
import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import { forwardRef } from 'react';

export type ColorModeProviderProps = ThemeProviderProps;

export function ColorModeProvider(props: ColorModeProviderProps) {
	return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />;
}

export function useColorMode() {
	const { resolvedTheme, setTheme } = useTheme();
	const toggleColorMode = () => {
		setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
	};
	return {
		colorMode: resolvedTheme,
		setColorMode: setTheme,
		toggleColorMode,
	};
}

export function useColorModeValue<T>(light: T, dark: T) {
	const { colorMode } = useColorMode();
	return colorMode === 'light' ? light : dark;
}

export function ColorModeIcon() {
	const { colorMode } = useColorMode();
	return colorMode === 'light' ? <Sun /> : <Moon />;
}

type ColorModeButtonProps = Omit<IconButtonProps, 'aria-label'>;

export const ColorModeButton = forwardRef<HTMLButtonElement, ColorModeButtonProps>(
	function ColorModeButton(props, ref) {
		const { toggleColorMode } = useColorMode();
		return (
			<ClientOnly fallback={<Skeleton boxSize="8" />}>
				<IconButton
					onClick={toggleColorMode}
					variant="ghost"
					aria-label="Toggle color mode"
					size="md"
					rounded="full"
					ref={ref}
					{...props}
				>
					<ColorModeIcon />
				</IconButton>
			</ClientOnly>
		);
	},
);
