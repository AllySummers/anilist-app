import { Badge } from '@chakra-ui/react';
import { ShieldAlert } from 'lucide-react';

export const MediaAdult = () => (
	<Badge colorPalette="red">
		Adult Content
		<ShieldAlert size={20} />
	</Badge>
);
