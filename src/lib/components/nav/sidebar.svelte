<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { ChevronUp, Clock, Menu, X } from '@lucide/svelte';

	import { Button } from '$ui/button';
	import * as Sidebar from '$ui/sidebar';

	import NavMain from './sidebar-nav.svelte';

	import { cn } from '$lib/utils/shadcn';
	import { useSidebar } from '$ui/sidebar';
	import * as DropdownMenu from '$ui/dropdown-menu';
	import * as Avatar from '$ui/avatar';
	import { authClient } from '$features/auth/client';
	import { goto } from '$app/navigation';
	import { useAuth } from '$features/auth/hooks';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		items = [],
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & {
		items: {
			name: string;
			// this should be `Component` after @lucide/svelte updates types
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			icon: any;
			id: string;
			href: string;
		}[];
	} = $props();
	const sidebar = useSidebar();

	const auth = useAuth();
</script>

<Sidebar.Root bind:ref {collapsible} class="bg-sidebar text-sidebar-foreground" {...restProps}>
	<Sidebar.Header class="flex h-14 flex-row items-center gap-0 border-b">
		<Sidebar.MenuItem
			class={cn('text-md w-full list-none items-center justify-start  text-gray-700')}
		>
			<div class="flex w-full items-center">
				<a
					href="/my/dashboard"
					class="font-heading flex flex-1 truncate text-left align-middle text-sm leading-tight"
				>
					<Clock
						class="inline aspect-square size-auto text-pink-500 group-data-[collapsible=icon]:hidden"
					/>
					<span class="font-lighter ml-1 inline truncate text-lg">
						<span class="truncate text-pink-500">tea</span><span>Time</span>
						<span class="text-muted-foreground align-middle text-xs">beta</span>
					</span>
				</a>
				<Button class="" variant="ghost" size="icon" onclick={() => sidebar.toggle()}>
					{#if sidebar.open}
						<X />
					{:else}
						<Menu />
					{/if}
				</Button>
			</div>
		</Sidebar.MenuItem>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain {items} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<div
			class="bg-muted text-muted-foreground flex-1 rounded border p-4 text-sm shadow-xs group-data-[collapsible=icon]:hidden"
		>
			<p class="w-full text-xs">
				We choose not to run any ads, but please consider donating to
				<a href="https://www.thetrevorproject.org/" target="_blank" class="text-pink-500 underline">
					The Trevor Project
				</a>
				to support queer youth.
			</p>
		</div>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						{#if $auth.isLoading || !$auth.data?.user}
							...
						{:else}
							<Avatar.Root class="mr-2 size-6">
								<Avatar.Image src={$auth.data.user.image} />
								<Avatar.Fallback>{$auth.data.user.name[0]}</Avatar.Fallback>
							</Avatar.Root>
							<span class="truncate">{$auth.data.user.name}</span>
						{/if}
						<ChevronUp class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content side="top" class=" w-[--bits-dropdown-menu-anchor-width]">
				<DropdownMenu.Item
					onclick={() =>
						authClient.signOut({
							fetchOptions: {
								onSuccess: () => {
									goto('/');
								},
							},
						})}
				>
					<span>Sign out</span>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
