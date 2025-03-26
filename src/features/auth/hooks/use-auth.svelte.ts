import { authClient } from '$features/auth/client';
import { toReadable } from '$utils/reactive-query-args.svelte';
import { createQuery, queryOptions } from '@tanstack/svelte-query';

const useAuth = () =>
	createQuery(
		toReadable(() =>
			queryOptions({
				queryKey: ['session'],
				queryFn: async () => {
					const { data: session } = await authClient.getSession();
					if (!session) {
						return null;
					}
					return session;
				},
			}),
		),
	);
export default useAuth;
