<script lang="ts">
	import { Monster } from '$lib/services/dnd5eApi';
	import type { PageData } from './$types';
	export let data: PageData;

	type ListEntry = {
		name: string;
		type: string;
		url: string;
	};

	const rows: ListEntry[] =
		data.spells.results
			?.map((spell) => ({
				name: spell.name ?? '',
				type: 'spell',
				url: `spells/${spell.index}`
			}))
			.concat(
				data.monsters.results?.map((monster) => ({
					name: monster.name ?? '',
					type: 'monster',
					url: 'todo'
				})) ?? []
			) ?? [];
</script>

<section class="px-24">
	<div class="flex flex-col bg-surface-100">
		{#each rows ?? [] as entry}
			<div class="flex flex-row p-2 hover:bg-surface-200">
				<span class="mr-4">
					<a href={`/vault/${entry.url}`}>
						{entry.name}
					</a>
				</span>

				<span class="">
					{entry.type}
				</span>
			</div>
		{/each}
	</div>
	<div class="editor" />
</section>
