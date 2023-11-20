<script lang="ts">
	import { Section } from 'flowbite-svelte-blocks';
	import { CheckCircleSolid, ExclamationCircleSolid } from 'flowbite-svelte-icons';
	import { Label, Input, Button, Select, Textarea, Spinner, Alert } from 'flowbite-svelte';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { loading } from '$lib/store';

	export let form;

	let level = 0;
	let priorityOptions = [
		{ value: 0, name: 'Info' },
		{ value: 1, name: 'Warning' },
		{ value: 2, name: 'Critical' }
	];
</script>

{#if !$loading}
	{#if form?.success}
		<Alert class="flex items-center" color="green">
			<CheckCircleSolid size={'sm'} />
			You have successfully submitted an alert.
		</Alert>
	{:else if form?.error}
		<Alert class="flex items-center" color="red">
			<ExclamationCircleSolid size={'sm'} />
			An error occured when submitting an alert.
		</Alert>
	{/if}
{/if}

<Section sectionClass="pt-8">
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new alert</h2>
	<form
		method="post"
		use:enhance={() => {
			$loading = true;
			return async ({ result }) => {
				setTimeout(async () => {
					$loading = false;
				}, 1000);
				await applyAction(result);
				await invalidateAll();
			};
		}}
	>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="w-full">
				<Label for="name" class="mb-2">Alert Name</Label>
				<Input type="text" name="name" placeholder="Type alert name" required />
			</div>
			<div class="w-full">
				<Label for="originID" class="mb-2"
					>Alert OriginID <span class="font-normal text-gray-400 italic">(Optional)</span></Label
				>
				<Input type="text" name="originID" placeholder="Type originID" />
			</div>
			<div class="w-full">
				<Label>Priority
					<Select class="mt-2" items={priorityOptions} required bind:value={level} />
				</Label>
			</div>

			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">Description</Label>
				<Textarea
					id="description"
					placeholder="Your description here"
					rows="4"
					name="description"
					required
				/>
			</div>

			<input name="level" type="hidden" bind:value={level} />

			<div class="flex gap-2">
				{#if $loading}
					<Button type="submit" class="w-36" disabled={true}
						><Spinner class="mr-3" size="4" color="white" />Loading...</Button
					>
				{:else}
					<Button type="submit" class="w-32" disabled={false}>Add Alert</Button>
				{/if}
				<Button color="alternative" type="reset" class="w-32">Clear</Button>
			</div>

		</div>
	</form>
</Section>
