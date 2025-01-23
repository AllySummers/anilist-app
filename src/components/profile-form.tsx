'use client';

import { VStack, Input, Fieldset, Button } from '@chakra-ui/react';
import { useActionState } from 'react';
import { setUser } from '@/actions/set-user';
import { Field } from '@/components/chakra-ui/field';
import type { UserData } from '@/stores/user-store';

export interface ProfileFormProps {
	legend: string;
	helperText: string;
	defaultValues?: Partial<UserData>;
}

export const ProfileForm = ({ defaultValues = {}, legend, helperText }: ProfileFormProps) => {
	const [state, action, isPending] = useActionState(setUser, {
		values: defaultValues,
		valid: false,
		errors: {},
	});

	return (
		<VStack asChild gap={8}>
			<form action={action}>
				<Fieldset.Root>
					<Fieldset.Legend>{legend}</Fieldset.Legend>
					<Fieldset.HelperText>{helperText}</Fieldset.HelperText>
					<Fieldset.Content>
						<Field
							label="Username"
							errorText={state.errors?.username}
							invalid={!!state?.errors?.username}
						>
							<Input defaultValue={state.values.username} name="username" required />
						</Field>

						<Field
							label="Job Title"
							errorText={state.errors?.jobTitle}
							invalid={!!state?.errors?.jobTitle}
						>
							<Input defaultValue={state.values.jobTitle} name="jobTitle" required />
						</Field>
					</Fieldset.Content>
				</Fieldset.Root>

				<Button
					type="submit"
					variant="solid"
					disabled={isPending}
					colorPalette={isPending ? 'gray' : 'blue'}
				>
					Submit
				</Button>
			</form>
		</VStack>
	);
};
