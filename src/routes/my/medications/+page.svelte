<script lang="ts">
	import type { PageData } from './$types';
	import { Check, Clock, MoreHorizontal, Pill as PillIcon, Plus } from '@lucide/svelte';

	import { Button } from '$ui/button';
	import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$ui/card';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuTrigger,
	} from '$ui/dropdown-menu';
	import { Badge } from '$ui/badge';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';

	const isMobile = new IsMobile();

	let { data }: { data: PageData } = $props();

	// placeholder data, will be replaced with real data from the database in the future
	const medications = $state([
		{
			id: 1,
			name: 'Estradiol',
			dosage: '2mg',
			frequency: 'Twice daily',
			time: '8:00 AM, 8:00 PM',
			type: 'Pill',
			color: 'pink',
			status: 'taken',
		},
		{
			id: 2,
			name: 'Spironolactone',
			dosage: '100mg',
			frequency: 'Twice daily',
			time: '8:00 AM, 8:00 PM',
			type: 'Pill',
			color: 'blue',
			status: 'taken',
		},
		{
			id: 3,
			name: 'Progesterone',
			dosage: '100mg',
			frequency: 'Once daily',
			time: '10:00 PM',
			type: 'Pill',
			color: 'purple',
			status: 'upcoming',
		},
	]);

	const handleTakeMedication = (id: number) => {
		medications.find((med) => med.id === id)!.status = 'taken';
		medications.sort((a, b) => {
			if (a.status === 'taken' && b.status !== 'taken') return 1;
			if (a.status !== 'taken' && b.status === 'taken') return -1;
			return 0;
		});
	};
</script>

<!-- <div class="p-4">
	<h2 class="text-2xl font-semibold">Medications</h2>
</div> -->

<div class="w-full space-y-8 px-4 py-6">
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold tracking-tight">Medications</h1>

		<Button variant="secondary" size="lg" class="hidden gap-1 md:flex">
			<Plus class="h-4 w-4" />
			Add Medication
		</Button>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		<!-- {meds.map((medication) => ( -->
		{#each medications as medication}
			<Card
				class={`border-2 ${
					medication.color === 'pink'
						? 'border-pink-200 dark:border-pink-900'
						: medication.color === 'blue'
							? 'border-blue-200 dark:border-blue-900'
							: 'border-purple-200 dark:border-purple-900'
				}`}
			>
				<CardHeader class="pb-2">
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div
								class={`flex h-10 w-10 items-center justify-center rounded-full ${
									medication.color === 'pink'
										? 'bg-pink-100 text-pink-500 dark:bg-pink-950'
										: medication.color === 'blue'
											? 'bg-blue-100 text-blue-500 dark:bg-blue-950'
											: 'bg-purple-100 text-purple-500 dark:bg-purple-950'
								}`}
							>
								<PillIcon class="h-5 w-5" />
							</div>
							<div>
								<CardTitle class="text-lg">{medication.name}</CardTitle>
								<CardDescription>{medication.dosage}</CardDescription>
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="ghost" size="icon" class="h-8 w-8">
									<MoreHorizontal class="h-4 w-4" />
									<span class="sr-only">Open menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Actions</DropdownMenuLabel>
								<DropdownMenuItem>Edit medication</DropdownMenuItem>
								<DropdownMenuItem>View history</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem class="text-destructive">Delete medication</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent class="py-2!">
					<div class="grid gap-3">
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Frequency:</span>
							<span class="text-sm font-medium">{medication.frequency}</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Time:</span>
							<span class="text-sm font-medium">{medication.time}</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-muted-foreground text-sm">Type:</span>
							<span class="text-sm font-medium">{medication.type}</span>
						</div>
					</div>
				</CardContent>
				<CardFooter class="flex justify-between pt-2">
					<Badge
						variant="outline"
						class={`${
							medication.status === 'taken'
								? 'border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300'
								: 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
						}`}
					>
						{#if medication.status === 'taken'}
							<Check class="mr-1 h-3 w-3" /> Taken
						{:else}
							<Clock class="mr-1 h-3 w-3" /> Upcoming
						{/if}
					</Badge>
					{#if medication.status === 'upcoming'}
						<Button
							size="sm"
							onclick={() => handleTakeMedication(medication.id)}
							class={`${
								medication.color === 'pink'
									? 'bg-pink-500 hover:bg-pink-600'
									: medication.color === 'blue'
										? 'bg-blue-500 hover:bg-blue-600'
										: 'bg-purple-500 hover:bg-purple-600'
							} text-white`}
						>
							Take Now
						</Button>
					{/if}
				</CardFooter>
			</Card>
		{/each}
	</div>

	<Button
		size="icon"
		class="fixed right-4 bottom-20 z-50 h-14 w-14 rounded-full bg-pink-500 shadow-lg hover:bg-pink-600 md:hidden"
	>
		<Plus class="h-6 w-6" />
		<span class="sr-only">Add Medication</span>
	</Button>
</div>
