<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<section>
	<div class="left-sidebar">
		{#each data?.spells.results ?? [] as spell}
			<span class="list-entry">
				<a href={`/vault/spells/${spell.index}`}> 
					{spell.name}
				</a>
			</span>
		{/each}
	</div>
	<div class="editor" />
</section>

<style>
	section {
		height: 100%;
		display: grid;
		grid-template-columns: 1fr 2.5fr;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas: 'list editor';
	}

	.editor {
		grid-area: editor;
	}

	.left-sidebar {
		grid-area: list;
		height: 100%;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		background-color: aliceblue;
	}

	.list-entry {
		padding: 0.4rem;
	}

	.list-entry:hover {
		background-color: white;
	}

</style> 
