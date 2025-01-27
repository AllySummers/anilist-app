'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from '@/components/chakra-ui/color-mode';

export function Provider({ children, ...props }: ColorModeProviderProps) {
	return (
		<ChakraProvider value={defaultSystem}>
			<ColorModeProvider {...props}>{children}</ColorModeProvider>
		</ChakraProvider>
	);
}
