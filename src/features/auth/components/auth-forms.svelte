<script lang="ts">
	import * as Tabs from '$ui/tabs';

	import { authClient } from '$features/auth/client';
	import { LoginForm, RegisterForm } from '$features/auth/forms';

	const { useSession } = authClient;

	const session = useSession();
</script>

{#if !$session.data?.user}
	<div class="text-card-foreground">
		<Tabs.Root value="login" class="bg-card mx-auto w-md max-w-full rounded border p-4 shadow-sm">
			<Tabs.List>
				<Tabs.Trigger value="login">Login</Tabs.Trigger>
				<Tabs.Trigger value="register">Register</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="login">
				<LoginForm />
			</Tabs.Content>
			<Tabs.Content value="register">
				<RegisterForm />
			</Tabs.Content>
		</Tabs.Root>
	</div>
{:else}
	<div class="text-card-foreground">
		<!-- ts-ignore -->
		{$session.data.user.name}
	</div>
{/if}
