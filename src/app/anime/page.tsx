import { getUser } from '@/actions/get-user';
import { querySearchAnilist, type SearchAnilistQueryVariables } from '@/gql/anilist-search.query';

export default async function AnimePage({
	searchParams,
}: {
	searchParams: Promise<SearchAnilistQueryVariables>;
}) {
	const params = await searchParams;
	const user = await getUser();

	if (!user) {
		// middleware will redirect to /register if the user is not authenticated
		return null;
	}

	const { data } = await querySearchAnilist({ variables: params });

	return (
		<>
			Anime
			{data.Page?.media?.map((item) => (
				<div key={item?.id}>
					<h2>{item?.title?.english}</h2>
					<p>{item?.description}</p>
				</div>
			))}
		</>
	);
}
