<script lang="ts">
	import { GameMechanicsApi, type APIReferenceList, type DamageType } from '$lib/services/dnd5eApi';
	import { onMount } from 'svelte';

	export let value: string;
	let damageTypes: undefined | APIReferenceList = undefined;

	onMount(async () => {
		const gameMechanicsApi = new GameMechanicsApi({});

		damageTypes = await gameMechanicsApi.apiDamageTypesGet();
		console.log(damageTypes);
	});
</script>

<table class="bg-slate-200  rounded-lg my-4">
	<tr>
		<th class="w-40 px-4">Type</th>
		<th class="w-40">Vulnerability</th>
		<th class="w-40">Resistance</th>
		<th class="w-40">Immunity</th>
	</tr>

	{#each damageTypes?.results ?? [] as damageType}
		<tr>
			<td class="w-16 px-4">{damageType.name}</td>
			<td class="text-center bg-slate-200 py-2"><input type="checkbox" /></td>
			<td class="text-center bg-slate-200 py-2"><input type="checkbox" /></td>
			<td class="text-center bg-slate-200 py-2"><input type="checkbox" /></td>
		</tr>
	{/each}
</table>
