'use client';

import type { HTMLChakraProps, RecipeProps } from '@chakra-ui/react';
import { createRecipeContext } from '@chakra-ui/react';
import Link from 'next/link';

export type LinkButtonProps = HTMLChakraProps<typeof Link, RecipeProps<'button'>>;

const { withContext } = createRecipeContext({ key: 'button' });

export const LinkButton = withContext<HTMLAnchorElement, LinkButtonProps>(Link);
