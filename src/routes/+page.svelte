<script lang="ts">
	import * as Tabs from '$ui/tabs';
	import Form, { type FormData } from '$components/forms/form.svelte';

	import { authClient } from '$features/auth/client';
	import AuthForms from '$features/auth/components/auth-forms.svelte';

	const { useSession } = authClient;
</script>

<AuthForms />
