import { DataListItem, type ItemProps } from '@/components/chakra-ui/data-list';
import type * as Types from '@/gql';
import { transformStatus } from '@/graphql/data-transformers/common-data';

export interface StatusProps extends Omit<ItemProps, 'label' | 'value'> {
	status?: Types.MediaStatus | `${Types.MediaStatus}`;
}

export const Status = ({ status, ...props }: StatusProps) => (
	<>{status && <DataListItem label="Status" value={transformStatus(status)} {...props} />}</>
);
