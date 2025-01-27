import { MediaCardBrowser } from '@/components/ui/media-card/media-card-browser';

export default function Loading() {
	// this component is used to render a loading state for the media card browser,
	// so it shouldn't matter if the media type is hard coded
	return <MediaCardBrowser mediaType="anime" allowSkeleton />;
}
