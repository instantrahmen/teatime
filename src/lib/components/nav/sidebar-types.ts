export type NavigationItem = {
	name: string;
	// this should be `Component` after @lucide/svelte updates types
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any;
	id: string;
	href: string;
};
