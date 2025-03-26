<script lang="ts">
	import { cn } from '$utils/shadcn';
	import { Button } from '$lib/components/ui/button';
	import type { NavigationItem } from './sidebar-types';
	import { page } from '$app/state';

	let {
		items,
	}: {
		items: NavigationItem[];
	} = $props();
</script>

<nav
	class="bg-sidebar/60 fixed right-0 bottom-0 left-0 m-1 overflow-hidden rounded-md border shadow-lg backdrop-blur-xl md:hidden"
>
	<div class="grid h-16 grid-cols-5">
		{#each items as item}
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
