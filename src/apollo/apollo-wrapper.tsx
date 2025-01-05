'use client';

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import type { PropsWithChildren } from 'react';
import { makeClient } from './apollo-client';

export const ApolloWrapper = ({ children }: PropsWithChildren) => {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
};
