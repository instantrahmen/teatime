// const navigation = [
// 	{ name: 'Home', icon: Home, id: 'home', href: '/my/dashboard' },
// 	{ name: 'Medications', icon: Pill, id: 'medications', href: '/my/medications' },
// 	{ name: 'Schedule', icon: Calendar, id: 'schedule', href: '/my/schedule' },
// 	{ name: 'Profile', icon: User, id: 'profile', href: '/my/profile' },
// 	{ name: 'Settings', icon: Settings, id: 'settings', href: '/my/settings' }
// ] as const;

export type NavigationItem = {
	name: string;
	// this should be `Component` after @lucide/svelte updates types
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	icon: any;
	id: string;
	href: string;
};
