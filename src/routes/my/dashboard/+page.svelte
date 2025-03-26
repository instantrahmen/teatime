<script lang="ts">
	import { Calendar } from '$lib/components/ui/calendar';
	import { Card } from '$lib/components/ui/card';
	import { Pill } from '@lucide/svelte';
	import type { PageData } from './$types';
	import { Progress } from '$lib/components/ui/progress';
	import { getLocalTimeZone, today } from '@internationalized/date';

	let { data }: { data: PageData } = $props();

	let value = $state([today(getLocalTimeZone())]);
</script>

<div class="container px-4 py-6">
	<div class="mb-8 space-y-4">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">
			Welcome back, {data.user.name}! 🌸
		</h2>
		<p class="text-muted-foreground">Track your journey with care and confidence</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<Card class="p-6">
			<h2 class="mb-4 font-semibold">Today's Progress</h2>
			<div class="space-y-4">
				<div>
					<div class="mb-2 flex justify-between text-sm">
						<span>Estradiol</span>
						<span>1/2 taken</span>
					</div>
					<Progress value={50} class="h-2" />
				</div>
				<div>
					<div class="mb-2 flex justify-between text-sm">
						<span>Spironolactone</span>
						<span>2/2 taken</span>
					</div>
					<Progress value={100} class="h-2" />
				</div>
			</div>
		</Card>

		<Card class="p-6">
			<h2 class="mb-4 font-semibold">Next Dose</h2>
			<div class="flex items-center space-x-4">
				<div class="rounded-full bg-pink-100 p-3 dark:bg-pink-900">
					<Pill class="h-6 w-6 text-pink-500" />
				</div>
				<div>
					<p class="font-medium">Estradiol 2mg</p>
					<p class="text-muted-foreground text-sm">In 4 hours</p>
				</div>
			</div>
		</Card>

		<Card class="p-6">
			<h2 class="mb-4 font-semibold">Streak</h2>
			<div class="space-x-4 text-center">
				<div>
					<p class="text-2xl font-bold">14 Days</p>
					<p class="text-muted-foreground text-sm">Perfect streak!</p>
				</div>
				<Calendar type="multiple" bind:value class="w-full rounded-md border shadow-sm" />
			</div>
		</Card>
	</div>
</div>
