import type { ButtonProps } from '@chakra-ui/react';
import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import { X } from 'lucide-react';
import { forwardRef } from 'react';

export type CloseButtonProps = ButtonProps;

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
	function CloseButton(props, ref) {
		return (
			<ChakraIconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
				{props.children ?? <X />}
			</ChakraIconButton>
		);
	},
);
