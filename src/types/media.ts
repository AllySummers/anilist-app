export const MEDIA_TYPES = ['anime', 'manga'] as const;

export type MediaType = (typeof MEDIA_TYPES)[number];

export const isMediaType = (value?: unknown): value is MediaType =>
	typeof value === 'string' && MEDIA_TYPES.includes(value as MediaType);
