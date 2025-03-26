<script lang="ts">
	import { goto } from '$app/navigation';
	import Form, { type FormData } from '$components/forms/form.svelte';

	import { authClient } from '../client';

	const { signIn } = authClient;

	let loginData: FormData = $state({
		fields: {
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
			rememberMe: {
				type: 'checkbox',
				label: 'Remember me',
				value: false,
			},
		},
		errors: {} as Record<string, string | null | false>,
	});

	const login = async (
		event: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		},
		_: FormData,
	) => {
		event.preventDefault();
		const { fields } = loginData;

		if (!fields.email.value) {
			loginData.errors.email = 'An email is required';
			return;
		}

		if (!fields.password.value) {
			loginData.errors.password = 'A password is required';
			return;
		}
		const { data, error } = await signIn.email({
			email: fields.email.value as string,
			password: fields.password.value as string,
		});

		if (error?.message) {
			loginData.errors.submit = error.message;
		}

		if (data?.token && data?.user) {
			goto('/my/dashboard');
		}
	};
</script>

<Form submitText="Login" bind:data={loginData} onSubmit={login} />
