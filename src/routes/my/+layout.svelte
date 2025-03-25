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
		{ name: 'Settings', icon: Settings, id: 'settings', href: '/my/settings' }
	];
</script>

<script lang="ts">
	import MainSidebar from '$components/nav/sidebar.svelte';

	let { children } = $props();
</script>

<Sidebar.Provider
	class="min-h-screen bg-linear-to-b from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950"
>
	<aside
		class={cn(
			'fixed top-0 left-0 m-2 hidden h-full w-64 flex-col rounded-md border-r bg-white/80 backdrop-blur-xl md:flex dark:bg-gray-950/80'
		)}
	>
		<div class="flex h-14 items-center border-b px-4">
			<Clock class="h-6 w-6 text-pink-500" />
			<span class="font-lighter ml-2 text-lg">
				<span class="text-pink-500">tea</span><span>Time</span>
				<span class="text-muted-foreground align-middle text-xs">beta</span>
			</span>
			<Button variant="ghost" class="ml-auto">
				<Menu class="h-5 w-5" />
			</Button>
		</div>
		<nav class="flex-1 space-y-2 p-4">
			{#each navigation as item}
				<Button
					variant={page.url.pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
					class="w-full justify-start"
					href={item.href}
				>
					<item.icon class="mr-2 h-5 w-5" />
					{item.name}
				</Button>
			{/each}
		</nav>
		<div class="mb-2 flex flex-col items-center gap-2 px-2">
			<div class="bg-muted text-muted-foreground flex-1 rounded border p-4 text-sm shadow-xs">
				<p class="w-full text-xs">
					We choose not to run any ads, but please consider donating to
					<a
						href="https://www.thetrevorproject.org/"
						target="_blank"
						class="text-pink-500 underline"
					>
						The Trevor Project
					</a>
					to support queer youth.
				</p>
			</div>

			<div
				class="bg-muted text-muted-foreground relative flex-1 rounded border p-4 text-xs shadow-xs"
			>
				<div class="absolute top-0 right-0 flex justify-end p-2">
					<Button variant="ghost" size="icon" class="h-4 w-4 p-0">
						<X class="h-4 w-4" />
					</Button>
				</div>
				Consider subscribing to Erika on her
				<a
					href="https://www.thetrevorproject.org/"
					target="_blank"
					class=" text-pink-500 underline"
				>
					Patreon
				</a>
				to help keep this site running and to hide these "ads"
			</div>
		</div>
		<div class="flex h-14 items-center border-t px-4">
			<div class="text-muted-foreground flex-1 text-sm">
				<p class=" text-xs">© {new Date().getFullYear()} Erika Cudd</p>
				<p class=" text-xs text-wrap">
					Licensed under
					<a href="https://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank"> AGPL-3.0 </a>
				</p>
			</div>
			<div class="flex items-center space-x-2">
				<Button variant="ghost" size="icon" class="h-4 w-4 p-0">
					<Github class="h-4 w-4" />
				</Button>
				<Button variant="ghost" size="icon" class="h-4 w-4 p-0">
					<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
						<path
							fill="currentColor"
							d="M188.88 28.29c-19.47-8-42.59-10.29-65.11-6.54c-24.28 4-45.33 14.53-60.88 30.34C25.47 90.15 33.05 167.56 50 207.88C56.87 224.36 69 244 87.51 244c25.38 0 36.72-22.14 46.73-41.68c6.73-13.14 13.69-26.74 24.23-33.89c5.49-3.72 13.22-6.7 21.41-9.86c23.69-9.13 56.12-21.64 56.12-65.4c0-28.98-17.18-52.63-47.12-64.88m-17.64 107.89c-9.08 3.5-18.48 7.13-26.24 12.39c-15.63 10.6-24.39 27.71-32.13 42.81C103.79 209.13 97.7 220 87.51 220c-1.28 0-8-3.81-15.41-21.4C57.48 163.75 51.89 97.51 80 68.91c11.79-12 28.73-20.34 47.69-23.49a104.4 104.4 0 0 1 17-1.39a94 94 0 0 1 35.08 6.47c12 4.92 32.21 17 32.21 42.67c.02 25.97-15.47 33.26-40.74 43.01"
						/>
					</svg>
				</Button>
			</div>
		</div>
	</aside>

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
						isActive && 'bg-secondary/90 text-pink-500 dark:bg-pink-950'
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
