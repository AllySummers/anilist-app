import { Flex, Text, Spinner, Center, VStack } from '@chakra-ui/react';
import { DataListItem, DataListRoot } from '@/components/chakra-ui/data-list';
import {
	DialogBody,
	DialogCloseTrigger,
	DialogContent,
	DialogHeader,
	DialogRoot,
	DialogTitle,
} from '@/components/chakra-ui/dialog';
import { Skeleton, SkeletonText } from '@/components/chakra-ui/skeleton';

export default function ModalLoading() {
	return (
		<DialogRoot defaultOpen size="sm" closeOnInteractOutside>
			<DialogContent>
				<DialogCloseTrigger />
				<DialogHeader
					display="flex"
					justifyContent="space-between"
					alignItems="start"
					flexDirection="row"
				>
					<DialogTitle lineClamp="2">Loading...</DialogTitle>
				</DialogHeader>
				<DialogBody minHeight="40" gap="3" pt="5" flexDirection="column" display="flex">
					<Center h="full">
						<VStack colorPalette="teal">
							<Spinner color="colorPalette.600" />
							<Text color="colorPalette.600">Fetching Details...</Text>
						</VStack>
					</Center>
					<Skeleton width="full" height="2xs" shadow="xl" marginBottom="2" />
					<Flex direction="column" flex="1" gap="0" justify="space-between">
						<DataListRoot orientation="horizontal" variant="subtle" gap="2">
							<DataListItem
								label={<SkeletonText noOfLines={1} />}
								value={<SkeletonText noOfLines={1} />}
							/>
							<DataListItem
								label={<SkeletonText noOfLines={1} />}
								value={<SkeletonText noOfLines={1} />}
							/>
							<DataListItem
								label={<SkeletonText noOfLines={1} />}
								value={<SkeletonText noOfLines={1} />}
							/>
							<DataListItem
								label={<SkeletonText noOfLines={1} />}
								value={<SkeletonText noOfLines={1} />}
							/>
							<DataListItem
								label={<SkeletonText noOfLines={1} />}
								value={<SkeletonText noOfLines={1} />}
							/>
						</DataListRoot>
					</Flex>
					<SkeletonText noOfLines={5} />
				</DialogBody>
			</DialogContent>
		</DialogRoot>
	);
}
