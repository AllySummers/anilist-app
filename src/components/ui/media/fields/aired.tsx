import { DataListItem, type ItemProps } from '@/components/chakra-ui/data-list';
import type { FuzzyDate } from '@/gql';
import { transformFuzzyDate } from '@/gql/data-transformers/common-data';

export interface AiredProps extends Omit<ItemProps, 'label' | 'value'> {
	startDate?: FuzzyDate;
	endDate?: FuzzyDate;
}

export const Aired = ({ startDate, endDate, ...props }: AiredProps) => {
	// if both startDate and endDate are not available, don't show anything
	// because it might be confusing to the user?
	if (!startDate?.year && !endDate?.year) {
		return null;
	}

	return (
		<DataListItem
			label="Aired"
			value={
				<>
					{startDate && transformFuzzyDate(startDate)}
					{(startDate || endDate) && ' — '}
					{endDate && transformFuzzyDate(endDate)}
				</>
			}
			{...props}
		/>
	);
};
