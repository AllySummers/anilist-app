import { ApolloLink, HttpLink } from '@apollo/client';
import {
	ApolloClient,
	InMemoryCache,
	SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';

// this needs to be an absolute url, as relative urls cannot be used in SSR
export const GRAPHQL_API = 'https://graphql.anilist.co/';

export const makeClient = () => {
	const httpLink = new HttpLink({
		uri: GRAPHQL_API,
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
					])
				: httpLink,
	});
};
