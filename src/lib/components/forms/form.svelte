<script module lang="ts">
	export type FieldDataValue =
		| {
				type: 'text' | 'password' | 'email';
				value: string;
		  }
		| {
				type: 'checkbox';
				value: boolean;
		  };
	export type FieldData = {
		label: string;
		placeholder?: string;
		required?: boolean;
	} & FieldDataValue;

	export type FormData<T = Record<string, FieldData>> = {
		fields: T;
		errors: Record<keyof T, string | undefined | null | false>;
	};

	export type FormProps<T = Record<string, FieldData>> = {
		data: FormData<T>;
		onSubmit?: (
			event: SubmitEvent & {
				currentTarget: EventTarget & HTMLFormElement;
			},
			data: FormData<T>,
		) => void;
		submitText?: string;
	};
</script>

<script lang="ts" generics="T extends Record<string, FieldData>">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';

	const { data = $bindable(), onSubmit, submitText = 'Submit' }: FormProps = $props();
</script>

<form onsubmit={(event) => onSubmit?.(event, data)}>
	<!-- <div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="email">Email</Label>
		<Input type="email" id="email" placeholder="Email" bind:value={loginData.values.email} />
		{@render error({ message: loginData.errors.email })}
	</div>
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label for="password">Password</Label>
		<Input
			type="password"
			id="password"
			placeholder="password"
			bind:value={loginData.values.password}
		/>
		{@render error({ message: loginData.errors.password })}
	</div>
	<Button type="submit">Login</Button>
	{@render error({ message: loginData.errors.submit })} -->

	{#each Object.keys(data.fields) as id}
		{@const field = data.fields[id]}

		{#if field.type === 'checkbox'}
			{@render checkbox({ id })}
		{:else}
			{@render input({ id })}
		{/if}
	{/each}

	<Button type="submit">{submitText}</Button>
	{@render error({ message: data.errors.submit })}
</form>

{#snippet error({ message }: { message?: string | null | false })}
	<p class="text-sm text-red-500">{message}</p>
{/snippet}

{#snippet input({ id }: { id: keyof typeof data.fields })}
	{@const field = data.fields[id]}
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<Label id="{id}-label" for={id}>
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html field.label}
		</Label>
		<Input type={field.type} name={id} {id} placeholder={field.label} bind:value={field.value} />
		{@render error({ message: data.errors[id] })}
	</div>
{/snippet}

{#snippet checkbox({ id }: { id: keyof typeof data.fields })}
	{@const field = data.fields[id]}
	<div class="flex w-full max-w-sm flex-col gap-1.5">
		<div class="flex items-center space-x-2">
			<Checkbox {id} bind:checked={field.value as boolean} aria-labelledby="{id}-label" />
			<Label
				id="{id}-label"
				for={id}
				class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html field.label}
				{#if field.required}
					<span class="text-red-500">*</span>
				{/if}
			</Label>
		</div>
		{@render error({ message: data.errors[id] })}
	</div>
{/snippet}
