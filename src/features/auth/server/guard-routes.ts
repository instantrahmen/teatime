import { redirect, type RequestEvent } from '@sveltejs/kit';
import globToRegex from 'glob-to-regexp';

/**
 * Ensure that a given pathname has a trailing slash for consistency and simpler matching.
 * @param path
 * @returns
 */
const ensureTrailingSlash = (path: string) => {
	return path.endsWith('/') ? path : path + '/';
};

/**
 *
 * @param route - The route to guard. Can be a glob pattern.
 * @param event - The event object from the handle function.
 * @param redirectTo - The route to redirect to if the user is not authenticated. Defaults to '/'.
 */
export const guardRoute = (route: string, event: RequestEvent, redirectTo: string = '/') => {
	const pathname = ensureTrailingSlash(event.url.pathname);
	const regex = globToRegex(route);

	if (regex.test(pathname)) {
		if (!event.locals.auth?.user) {
			throw redirect(303, redirectTo);
		}
	}
};

/**
 *
 * @param routes - An array of routes to guard. Each route can be a glob pattern.
 * @param event - The event object from the handle function.
 * @param redirectTo - The route to redirect to if the user is not authenticated. Defaults to '/'.
 */
export const guardRoutes = (routes: string[], event: RequestEvent, redirectTo: string = '/') => {
	for (const route of routes) {
		guardRoute(route, event, redirectTo);
	}
};
