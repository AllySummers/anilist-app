'use client';

import { AbsoluteCenter, Menu as ChakraMenu, Portal } from '@chakra-ui/react';
import { Check, ChevronRight } from 'lucide-react';
import { forwardRef, type ReactNode, RefObject } from 'react';

interface MenuContentProps extends ChakraMenu.ContentProps {
	portalled?: boolean;
	portalRef?: RefObject<HTMLElement>;
}

export const MenuContent = forwardRef<HTMLDivElement, MenuContentProps>(
	function MenuContent(props, ref) {
		const { portalled = true, portalRef, ...rest } = props;
		return (
			<Portal disabled={!portalled} container={portalRef}>
				<ChakraMenu.Positioner>
					<ChakraMenu.Content ref={ref} {...rest} />
				</ChakraMenu.Positioner>
			</Portal>
		);
	},
);

export const MenuArrow = forwardRef<HTMLDivElement, ChakraMenu.ArrowProps>(
	function MenuArrow(props, ref) {
		return (
			<ChakraMenu.Arrow ref={ref} {...props}>
				<ChakraMenu.ArrowTip />
			</ChakraMenu.Arrow>
		);
	},
);

export const MenuCheckboxItem = forwardRef<HTMLDivElement, ChakraMenu.CheckboxItemProps>(
	function MenuCheckboxItem(props, ref) {
		return (
			<ChakraMenu.CheckboxItem ref={ref} {...props}>
				<ChakraMenu.ItemIndicator hidden={false}>
					<Check />
				</ChakraMenu.ItemIndicator>
				{props.children}
			</ChakraMenu.CheckboxItem>
		);
	},
);

export const MenuRadioItem = forwardRef<HTMLDivElement, ChakraMenu.RadioItemProps>(
	function MenuRadioItem(props, ref) {
		const { children, ...rest } = props;
		return (
			<ChakraMenu.RadioItem ps="8" ref={ref} {...rest}>
				<AbsoluteCenter axis="horizontal" left="4" asChild>
					<ChakraMenu.ItemIndicator>
						<Check />
					</ChakraMenu.ItemIndicator>
				</AbsoluteCenter>
				<ChakraMenu.ItemText>{children}</ChakraMenu.ItemText>
			</ChakraMenu.RadioItem>
		);
	},
);

export const MenuItemGroup = forwardRef<HTMLDivElement, ChakraMenu.ItemGroupProps>(
	function MenuItemGroup(props, ref) {
		const { title, children, ...rest } = props;
		return (
			<ChakraMenu.ItemGroup ref={ref} {...rest}>
				{title && (
					<ChakraMenu.ItemGroupLabel userSelect="none">{title}</ChakraMenu.ItemGroupLabel>
				)}
				{children}
			</ChakraMenu.ItemGroup>
		);
	},
);

export interface MenuTriggerItemProps extends ChakraMenu.ItemProps {
	startIcon?: ReactNode;
}

export const MenuTriggerItem = forwardRef<HTMLDivElement, MenuTriggerItemProps>(
	function MenuTriggerItem(props, ref) {
		const { startIcon, children, ...rest } = props;
		return (
			<ChakraMenu.TriggerItem ref={ref} {...rest}>
				{startIcon}
				{children}
				<ChevronRight />
			</ChakraMenu.TriggerItem>
		);
	},
);

export const MenuRadioItemGroup = ChakraMenu.RadioItemGroup;
export const MenuContextTrigger = ChakraMenu.ContextTrigger;
export const MenuRoot = ChakraMenu.Root;
export const MenuSeparator = ChakraMenu.Separator;
export const MenuItem = ChakraMenu.Item;
export const MenuItemText = ChakraMenu.ItemText;
export const MenuItemCommand = ChakraMenu.ItemCommand;
export const MenuTrigger = ChakraMenu.Trigger;
