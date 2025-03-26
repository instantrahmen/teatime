import { auth } from '$features/auth/server';
import { redirect } from '@sveltejs/kit';

export const load = async ({ parent, request: { headers } }) => {
	// get session type from return type of authClient.getSession</typeof>>>;

	// const session = await authClient.getSession({
	// 	headers,
	// });

	const session = await auth.api.getSession({
		headers,
		query: {
			disableCookieCache: true,
		},
	});

	if (session?.user) {
		console.log('user', session.user);
		// return redirect(302, '/my/dashboard');
	} else {
		console.log('no user', session);
	}
	return {};
};
