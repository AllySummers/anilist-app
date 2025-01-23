import { getUserAction } from '@/actions/user/get-user';
import { queryAnilistDetails } from '@/gql/anilist-details.query';
import { MediaType } from '@/types/media';
import { NextPageProps } from '@/types/utility-types';

interface MediaItemPageParams {
	params: {
		mediaType: MediaType;
		slug: string;
	};
}

export default async function MediaItemPage({ params }: NextPageProps<MediaItemPageParams>) {
	const user = await getUserAction();
	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	const { slug } = await params;
	const data = await queryAnilistDetails({ variables: { id: Number(slug) } });
	// console.log(data.data.Media);

	return (
		<>
			Viewing item {slug}
			<pre>
				<code>{JSON.stringify(data)}</code>
			</pre>
		</>
	);
}
