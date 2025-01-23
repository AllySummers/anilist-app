'use client';

import type { IconButtonProps } from '@chakra-ui/react';
import { ClientOnly, IconButton } from '@chakra-ui/react';
import { Sun, Moon, SunMoon } from 'lucide-react';
import { ThemeProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';
import { forwardRef } from 'react';

export type ColorModeProviderProps = ThemeProviderProps;
export type Theme = 'light' | 'dark';

export const ColorModeProvider = (props: ColorModeProviderProps) => (
	<ThemeProvider attribute="class" disableTransitionOnChange {...props} />
);

export const isColorMode = (theme?: string): theme is Theme =>
	theme === 'light' || theme === 'dark';

export function useColorMode() {
	const { resolvedTheme, setTheme } = useTheme();
	const toggleColorMode = () => {
		setTheme(resolvedTheme === 'light' ? 'dark' : 'light');
	};
	return {
		colorMode: isColorMode(resolvedTheme) ? resolvedTheme : undefined,
		setColorMode: setTheme,
		toggleColorMode,
	};
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
			<ClientOnly
				fallback={
					<IconButton
						variant="ghost"
						disabled
						aria-label="Loading theme options"
						rounded="full"
						size="md"
						ref={ref}
					>
						<SunMoon />
					</IconButton>
				}
			>
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
