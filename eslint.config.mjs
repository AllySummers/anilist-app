// @ts-check
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const config = tseslint.config([
	{
		ignores: ['.next'],
	},
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	prettierConfig,
	{
		settings: {
			'jsx-a11y': {
				// this stops warnings about alt text when using `asChild`, e.g. for the chakra ui Image + next Image component
				polymorphicPropName: 'asChild',
			},
		},
		rules: {
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
					],
					pathGroups: [
						{
							pattern: '@/**',
							group: 'internal',
							position: 'before',
						},
						{
							pattern: 'react',
							group: 'external',
							position: 'before',
						},
						{
							pattern: 'react-dom',
							group: 'external',
							position: 'before',
						},
						{
							pattern: 'next',
							group: 'external',
							position: 'before',
						},
						{
							pattern: 'next/**',
							group: 'external',
							position: 'before',
						},
					],
					alphabetize: {
						order: 'asc',
					},
				},
			],
		},
	},
	tseslint.configs.recommendedTypeChecked,
	{
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: {
					allowDefaultProject: ['*.js', '*.mjs'],
				},
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ['src/graphql/__generated__/*.ts'],
		// disable type checking for generated files, as it makes eslint slow
		...tseslint.configs.disableTypeChecked,
		rules: {
			...tseslint.configs.disableTypeChecked.rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
		},
	},
]);

export default config;
