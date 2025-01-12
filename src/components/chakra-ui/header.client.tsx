'use client';

import { chakra } from '@chakra-ui/react';

export const HeaderRoot = chakra('header', {
	base: {
		bg: 'bg',
		position: 'sticky',
		top: '0',
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
		minHeight: '64px',
		borderBottom: '1px solid',
		borderColor: 'border.muted',
		zIndex: '10',
	},
});
