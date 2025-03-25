<script lang="ts">
	import * as Sidebar from '$ui/sidebar';
	import type { NavigationItem } from './sidebar-types';
	import { page } from '$app/state';
	import { cn } from '$lib/utils/shadcn';
	import { Button } from '$ui/button';

	let {
		items
	}: {
		items: NavigationItem[];
	} = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Dashboard</Sidebar.GroupLabel>
	<Sidebar.GroupContent>
		<Sidebar.Menu class="flex flex-col gap-2">
			{#each items as item (item.name)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton
						class={cn(
							'text-md w-full justify-start text-gray-700',
							page.url.pathname.startsWith(item.href) &&
								'bg-secondary text-pink-500 hover:text-pink-800'
						)}
					>
						{#snippet child({ props })}
							<Button variant="ghost" href={item.href} {...props}>
								<item.icon class="mr-1 size-4!" />
								<span>{item.name}</span>
							</Button>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
