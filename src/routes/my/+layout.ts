import type { LayoutLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchQuery({
		queryKey: ['session'],
		queryFn: () => fetch('/api/auth/get-session').then((res) => res.json()),
	});

	return {};
}) satisfies LayoutLoad;
