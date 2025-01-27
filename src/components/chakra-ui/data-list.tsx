import { DataList as ChakraDataList } from '@chakra-ui/react';
import { forwardRef, type ReactNode } from 'react';
import { InfoTip } from './toggle-tip';

export const DataListRoot = ChakraDataList.Root;

export interface ItemProps extends ChakraDataList.ItemProps {
	label: ReactNode;
	value: ReactNode;
	info?: ReactNode;
	icon?: ReactNode;
	iconLabel?: string;
	grow?: boolean;
}

export const DataListItem = forwardRef<HTMLDivElement, ItemProps>(
	function DataListItem(props, ref) {
		const { label, info, value, children, grow, icon, iconLabel, ...rest } = props;
		return (
			<ChakraDataList.Item ref={ref} {...rest}>
				<ChakraDataList.ItemLabel flex={grow ? '1' : undefined}>
					{label}
					{info && (
						<InfoTip icon={icon} ariaLabel={iconLabel}>
							{info}
						</InfoTip>
					)}
				</ChakraDataList.ItemLabel>
				<ChakraDataList.ItemValue flex={grow ? '1' : undefined}>
					{value}
				</ChakraDataList.ItemValue>
				{children}
			</ChakraDataList.Item>
		);
	},
);
