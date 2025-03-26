<script lang="ts">
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { resetMode, setMode, setTheme, mode, theme } from 'mode-watcher';

	import * as DropdownMenu from '$ui/dropdown-menu';
	import * as Tabs from '$lib/components/ui/tabs';
	import { buttonVariants } from '$ui/button';

	import { themes, modes } from '../themes';

	$inspect({ mode, theme });
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
		<Sun
			class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
		/>
		<span class="sr-only">Toggle theme</span>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<Tabs.Root value="system" class="flex w-full flex-col">
			<Tabs.List class="grid w-full grid-cols-3">
				{#each Object.entries(modes) as [modeName, mode]}
					<Tabs.Trigger
						value={mode ?? 'system'}
						onclick={() => (mode ? setMode(mode) : resetMode())}>{modeName}</Tabs.Trigger
					>
				{/each}
			</Tabs.List>

			<Tabs.Content value={'system'} class="flex flex-col gap-2">
				<DropdownMenu.Label>Theme</DropdownMenu.Label>
				{#each Object.entries(themes) as [themeName, theme]}
					<DropdownMenu.Item onclick={() => setTheme(theme)}>{themeName}</DropdownMenu.Item>
				{/each}
			</Tabs.Content>
		</Tabs.Root>
	</DropdownMenu.Content>
</DropdownMenu.Root>
