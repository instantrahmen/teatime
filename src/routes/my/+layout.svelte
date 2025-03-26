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
	import MainSidebar from '$components/nav/sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider
	class="min-h-screen bg-linear-to-b from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950"
>
	<MainSidebar items={navigation} />

	<Sidebar.Inset>
		{@render children()}
	</Sidebar.Inset>
	<nav
		class="bg-sidebar/60 fixed right-0 bottom-0 left-0 m-1 overflow-hidden rounded-md border shadow-lg backdrop-blur-xl md:hidden"
	>
		<div class="grid h-16 grid-cols-5">
			{#each navigation as item}
				{@const isActive = page.url.pathname.startsWith(item.href)}
				<Button
					variant="ghost"
					class={cn(
						'flex h-full flex-col items-center justify-center rounded-none',
						isActive && 'bg-secondary/90 text-pink-500 dark:bg-pink-950',
					)}
					href={item.href}
				>
					<item.icon class="h-6 w-6" />
					<span class={cn('-mt-1 text-xs font-light', isActive && 'font-semibold')}>
						{item.name}
					</span>
				</Button>
			{/each}
		</div>
	</nav>
</Sidebar.Provider>
