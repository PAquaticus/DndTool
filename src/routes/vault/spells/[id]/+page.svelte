<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { spell } = data;
  console.log(spell);
  
</script>

<section>
	<h1>Spell Editor</h1>
	<div class="editor-row">
		<div>name</div>
		<div>{spell.name}</div>
	</div>
	<div class="editor-row">
		<div>casting time</div>
		<div>{spell.castingTime}</div>
	</div>
	<div class="editor-row">
		<div>range</div>
		<div>{spell.range}</div>
	</div>
	<div class="editor-row">
		<div>components</div>
		<div>{spell.components}</div>
	</div>
	<div class="editor-row">
		<div>duration</div>
		<div>{spell.duration}</div>
	</div>
	<div class="editor-row">
		<div>description</div>
		<div>{spell.desc?.join('\n')}</div>
	</div>
</section>

<style>
	.editor-row {
		display: flex;
		flex-direction: row;
	}
</style>
