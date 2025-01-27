import { DataListItem, type ItemProps } from '@/components/chakra-ui/data-list';

export interface DurationProps extends Omit<ItemProps, 'label' | 'value'> {
	duration?: number;
}

export const Duration = ({ duration, ...props }: DurationProps) => (
	<>
		{typeof duration === 'number' && (
			<DataListItem label="Duration" value={`${duration} mins`} {...props} />
		)}
	</>
);
