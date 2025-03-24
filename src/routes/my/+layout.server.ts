import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	return {
		user: {
			name: 'Alex',
			email: 'alex@example.com',
			avatar: 'https://i.pravatar.cc/300'
		}
	};
}) satisfies LayoutServerLoad;
