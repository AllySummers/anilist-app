import { getUser } from '@/actions/get-user';
import { queryAnilistDetails } from '@/gql/anilist-details.query';

export default async function AnimeItemPage({ params }: { params: Promise<{ slug: string }> }) {
	const user = await getUser();
	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	const { slug } = await params;
	const data = await queryAnilistDetails({ variables: { id: Number(slug) } });
	console.log(data.data.Media);

	return (
		<>
			Viewing item {slug}
			<pre>
				<code>{JSON.stringify(data)}</code>
			</pre>
		</>
	);
}
