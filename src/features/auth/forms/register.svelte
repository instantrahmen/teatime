<script lang="ts">
	import Form, { type FormData } from '$components/forms/form.svelte';

	import { authClient } from '../client';

	const { signIn, signUp } = authClient;

	let registerData: FormData = $state({
		fields: {
			name: {
				type: 'text',
				label: 'Name',
				value: '',
			},
			email: {
				type: 'email',
				label: 'Email',
				value: '',
			},
			password: {
				type: 'password',
				label: 'Password',
				value: '',
			},
			confirmPassword: {
				type: 'password',
				label: 'Confirm Password',
				value: '',
			},
			terms: {
				type: 'checkbox',
				label: `I have read and agree to the <a href="/terms" class="underline text-secondary">terms and conditions.</a>`,
				value: false,
			},
		},
		errors: {} as Record<string, string | null | false>,
	});

	const register = async (
		event: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		},
		_: FormData,
	) => {
		event.preventDefault();

		const { fields } = registerData;
		if (fields.password.value !== fields.confirmPassword.value) {
			registerData.errors.confirmPassword = 'Passwords do not match';
			return;
		}

		if (!fields.terms.value) {
			registerData.errors.terms = 'You must agree to the terms and conditions';
			return;
		}

		if (!fields.name.value) {
			registerData.errors.name = 'A name is required';
			return;
		}

		const { data, error } = await signUp.email({
			email: fields.email.value as string,
			password: fields.password.value as string,
			name: fields.name.value as string,
		});

		console.log({ data, error });
	};
</script>

<Form submitText="Register" bind:data={registerData} onSubmit={register} />
