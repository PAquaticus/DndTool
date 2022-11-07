<script lang="ts">
	import EditorRowInput from '../../components/EditorRowInput.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { spell } = data;
</script>

<section class="px-16 py-8 flex flex-row justify-center">
	<div>
		<h1>Spell Editor</h1>
		<div class="flex flex-row">
			<div class="flex flex-col mr-4">
				<EditorRowInput name="Name">
					<input type="text" id="Name" bind:value={spell.name} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="description">
					<textarea class="h-64" id="description" bind:value={spell.desc} minlength="2" required />
				</EditorRowInput>
			</div>

			<div class="flex flex-col ml-4">
				<EditorRowInput name="castingTime">
					<input
						type="text"
						id="castingTime"
						bind:value={spell.castingTime}
						minlength="2"
						required
					/>
				</EditorRowInput>

				<EditorRowInput name="Range">
					<input type="text" id="range" bind:value={spell.range} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Components">
					<input type="text" id="components" bind:value={spell.components} minlength="2" required />
				</EditorRowInput>

				<EditorRowInput name="Duration">
					<input type="text" id="duration" bind:value={spell.duration} minlength="2" required />
				</EditorRowInput>
			</div>
		</div>
	</div>
</section>

<style>
	.editor-row {
		margin-top: 2rem;
		width: 40rem;
	}
</style>
