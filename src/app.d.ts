// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
// import type { AuthData } from '$features/auth/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('./features/auth/types').AuthData | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
