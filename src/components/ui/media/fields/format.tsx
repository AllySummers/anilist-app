import { DataListItem, type ItemProps } from '@/components/chakra-ui/data-list';
import type * as Types from '@/gql';
import { transformFormat } from '@/graphql/data-transformers/common-data';

export interface FormatProps extends Omit<ItemProps, 'label' | 'value'> {
	format?: Types.MediaFormat | `${Types.MediaFormat}`;
}

export const Format = ({ format, ...props }: FormatProps) => (
	<>{format && <DataListItem label="Format" value={transformFormat(format)} {...props} />}</>
);
