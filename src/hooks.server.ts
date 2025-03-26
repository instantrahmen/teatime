import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { auth } from '$features/auth/server'; // path to your auth file
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { guardRoutes } from '$features/auth/server/guard-routes';

const guardedRoutes = ['/my/**'];

const handleGuard: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	guardRoutes(guardedRoutes, event, '/login');
	return response;
};

const handleAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });
	event.locals.auth = session;

	return svelteKitHandler({ event, resolve, auth });
};

export const handle = sequence(handleAuth, handleGuard);
