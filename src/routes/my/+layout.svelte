<script lang="ts" module>
	import { Button } from '$ui/button';
	import { Home, Calendar, User, Settings, Pill, Clock, X, Github, Menu } from '@lucide/svelte';
	import { page } from '$app/state';
	import { cn } from '$utils/shadcn';
	import * as Sidebar from '$ui/sidebar';
	import type { NavigationItem } from '$lib/components/nav/sidebar-types';

	const navigation: NavigationItem[] = [
		{ name: 'Home', icon: Home, id: 'home', href: '/my/dashboard' },
		{ name: 'Medications', icon: Pill, id: 'medications', href: '/my/medications' },
		{ name: 'Schedule', icon: Calendar, id: 'schedule', href: '/my/schedule' },
		{ name: 'Profile', icon: User, id: 'profile', href: '/my/profile' },
		{ name: 'Settings', icon: Settings, id: 'settings', href: '/my/settings' },
	];
</script>

<script lang="ts">
	import { SidebarNav, BottomNav } from '$components/nav';

	let { children } = $props();
</script>

<Sidebar.Provider
	class="min-h-screen bg-linear-to-b from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950"
>
	<SidebarNav items={navigation} />

	<Sidebar.Inset>
		{@render children()}
	</Sidebar.Inset>

	<BottomNav items={navigation} />
</Sidebar.Provider>
