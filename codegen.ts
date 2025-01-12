import type { CodegenConfig } from '@graphql-codegen/cli';
import type { plugin as ReactApolloPlugin } from '@graphql-codegen/typescript-react-apollo';

type ReactApolloPluginConfig = Parameters<typeof ReactApolloPlugin>[2];

const header = `/* eslint-disable */
// prettier-ignore
/** @fileoverview
 * This file was generated by GraphQL Codegen.
 * You should not modify this file directly.
 * Please modify the source GraphQL files instead and
 * then run \`npm run codegen\` to update this file.
 */
`;

const reactApolloConfig: Omit<ReactApolloPluginConfig, 'documentMode'> & {
	documentMode?: `${ReactApolloPluginConfig['documentMode']}`;
} = {
	// withHooks: true,
	useTypeImports: true,
	namingConvention: {
		typeNames: 'change-case-all#pascalCase',
	},
	withHooks: true,
	withMutationFn: true,
	withComponent: false,
	withFragmentHooks: true,
	withHOC: false,
	withMutationOptionsType: true,
	withRefetchFn: true,
	withResultType: true,
	reactApolloVersion: 3,
	optimizeDocumentNode: true,
	// documentMode: 'documentNodeImportFragments',
	// gqlImport: 'graphql-typed-document-node',
};

const config: CodegenConfig = {
	schema: 'https://graphql.anilist.co/',
	documents: ['src/graphql/**/*.{graphql,gql}'],
	generates: {
		'src/graphql/__generated__/types.ts': {
			plugins: [
				'typescript',
				{
					add: {
						content: header,
					},
				},
			],
		},
		'./src/graphql': {
			overwrite: true,
			preset: 'near-operation-file',
			plugins: ['typescript-operations', 'typescript-react-apollo'],
			presetConfig: {
				baseTypesPath: '~@/gql/types',
				folder: '__generated__',
				extension: '.ts',
			},
			config: reactApolloConfig,
			hooks: {
				beforeOneFileWrite: (_path: string, content: string) => {
					const name = /const (.*)Document = gql`/g.exec(content)?.[1];

					if (name) {
						return `${header}
import { query } from '@/lib/apollo/register-apollo-client';
${content}
export const query${name} = (
	options: Omit<Apollo.QueryOptions<${name}QueryVariables, ${name}Query>, 'query'>,
) =>
	query<${name}Query, ${name}QueryVariables>({
		query: ${name}Document,
		...options,
	});
`;
					}
				},
			},
		},
	},
};

export default config;
