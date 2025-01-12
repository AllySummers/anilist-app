import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { makeClient } from './client';

export const { getClient, query, PreloadQuery } = registerApolloClient(makeClient);
