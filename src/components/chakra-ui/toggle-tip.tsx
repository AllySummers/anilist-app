import { Popover as ChakraPopover, IconButton, Portal } from '@chakra-ui/react';
import { Info } from 'lucide-react';
import { forwardRef, type RefObject, type ReactNode } from 'react';

export interface ToggleTipProps extends ChakraPopover.RootProps {
	showArrow?: boolean;
	portalled?: boolean;
	portalRef?: RefObject<HTMLElement>;
	content?: ReactNode;
	icon?: ReactNode;
	ariaLabel?: string;
}

export const ToggleTip = forwardRef<HTMLDivElement, ToggleTipProps>(function ToggleTip(props, ref) {
	const { showArrow, children, portalled = true, content, portalRef, ...rest } = props;

	return (
		<ChakraPopover.Root {...rest} positioning={{ ...rest.positioning, gutter: 4 }}>
			<ChakraPopover.Trigger asChild>{children}</ChakraPopover.Trigger>
			<Portal disabled={!portalled} container={portalRef}>
				<ChakraPopover.Positioner>
					<ChakraPopover.Content
						width="auto"
						px="2"
						py="1"
						textStyle="xs"
						rounded="sm"
						ref={ref}
					>
						{showArrow && (
							<ChakraPopover.Arrow>
								<ChakraPopover.ArrowTip />
							</ChakraPopover.Arrow>
						)}
						{content}
					</ChakraPopover.Content>
				</ChakraPopover.Positioner>
			</Portal>
		</ChakraPopover.Root>
	);
});

export const InfoTip = forwardRef<HTMLDivElement, Partial<ToggleTipProps>>(
	function InfoTip(props, ref) {
		const { children, icon = <Info />, ariaLabel = 'info', ...rest } = props;
		return (
			<ToggleTip content={children} {...rest} ref={ref}>
				<IconButton variant="ghost" aria-label={ariaLabel} size="2xs" colorPalette="gray">
					{icon}
				</IconButton>
			</ToggleTip>
		);
	},
);
