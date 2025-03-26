import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';

export async function load({ fetch }) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
			},
		},
	});

	await queryClient.prefetchQuery({
		queryKey: ['session'],
		queryFn: () => fetch('/api/auth/get-session').then((res: Response) => res.json()),
	});

	return { queryClient };
}
