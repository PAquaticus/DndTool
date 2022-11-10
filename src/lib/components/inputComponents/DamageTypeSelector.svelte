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
		<th />
		{#each damageTypes?.results ?? [] as damageType}
			<th class="w-24 text-sm font">{damageType.name}</th>
		{/each}
	</tr>
	<tr>
		<td>Vulnerabilities</td>
		{#each damageTypes?.results ?? [] as damageType}
			<td class="text-center bg-slate-200 py-2"><input type="checkbox" /></td>
		{/each}
	</tr>
	<tr
		><td>Resistances</td>
		{#each damageTypes?.results ?? [] as damageType}
			<td class="text-center bg-slate-200 py-2"><input type="checkbox" /></td>
		{/each}
	</tr>
	<tr
		><td>Immunities</td>
		{#each damageTypes?.results ?? [] as damageType}
			<td class="text-center bg-slate-200 py-2"><input type="checkbox" /></td>
		{/each}
	</tr>
</table>
