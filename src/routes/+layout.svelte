<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	let { children, data } = $props();

	const { queryClient } = data;
</script>

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
