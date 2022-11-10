<script lang="ts">
	import { GameMechanicsApi, type DamageType } from '$lib/services/dnd5eApi';
	import { onMount } from 'svelte';

	export let value: string;
	let damageTypes: undefined | DamageType[] = undefined;

	onMount(async () => {
		const gameMechanicsApi = new GameMechanicsApi({});

		console.log('foo');
		damageTypes = await gameMechanicsApi.apiDamageTypesGet();
		console.log(damageTypes);
	});
</script>

<div>
	asdasd
	{#each damageTypes ?? [] as dmg}
		{dmg.name}
	{/each}
</div>
