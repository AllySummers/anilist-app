import type { Metadata } from 'next';

export const siteInfo = {
	title: {
		template: '%s | Anilist Explorer',
		default: 'Anilist Explorer',
	},
	description:
		'Anilist Explorer is a web application that allows you to search for anime and manga titles, and view information about them.',
} satisfies Metadata;
